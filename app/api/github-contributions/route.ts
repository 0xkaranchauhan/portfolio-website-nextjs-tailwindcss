import { NextResponse } from "next/server";

const GITHUB_USERNAME = "0xkaranchauhan";

// Calculate streak from contribution data
function calculateStreaks(weeks: any[]) {
  const allDays = weeks.flatMap((week) => week.contributionDays);
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Calculate current streak (from today backwards)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = allDays.length - 1; i >= 0; i--) {
    const day = allDays[i];
    const dayDate = new Date(day.date);
    dayDate.setHours(0, 0, 0, 0);

    if (dayDate > today) continue;

    if (day.contributionCount > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Calculate longest streak
  for (const day of allDays) {
    if (day.contributionCount > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return { currentStreak, longestStreak };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year");

  // If no year specified, get last 12 months
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  const from = yearParam
    ? `${yearParam}-01-01T00:00:00Z`
    : oneYearAgo.toISOString();
  const to = yearParam ? `${yearParam}-12-31T23:59:59Z` : now.toISOString();

  const query = `
    query($userName:String!, $from:DateTime!, $to:DateTime!) {
      user(login: $userName) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
        repositories(first: 10, orderBy: {field: STARGAZERS, direction: DESC}, privacy: PUBLIC) {
          nodes {
            name
            description
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            url
          }
        }
        repositoriesContributedTo(first: 100, contributionTypes: [COMMIT]) {
          totalCount
        }
      }
    }
  `;

  const commitsQuery = `
    query($userName:String!) {
      user(login: $userName) {
        repositories(first: 10, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            name
            url
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 5) {
                    totalCount
                    nodes {
                      message
                      committedDate
                      oid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    userName: GITHUB_USERNAME,
    from,
    to,
  };

  try {
    const [contributionsResponse, commitsResponse] = await Promise.all([
      fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN || ""}`,
        },
        body: JSON.stringify({ query, variables }),
      }),
      fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN || ""}`,
        },
        body: JSON.stringify({
          query: commitsQuery,
          variables: { userName: GITHUB_USERNAME },
        }),
      }),
    ]);

    if (!contributionsResponse.ok || !commitsResponse.ok) {
      const contribError = !contributionsResponse.ok
        ? await contributionsResponse.text()
        : null;
      const commitsError = !commitsResponse.ok
        ? await commitsResponse.text()
        : null;
      console.error("GitHub API HTTP Error:", {
        contributionsStatus: contributionsResponse.status,
        contributionsError: contribError,
        commitsStatus: commitsResponse.status,
        commitsError: commitsError,
      });
      return NextResponse.json(
        {
          error: "Failed to fetch GitHub data",
          details: { contribError, commitsError },
        },
        { status: 500 },
      );
    }

    const contributionsData = await contributionsResponse.json();
    const commitsData = await commitsResponse.json();

    // Debug output
    console.log(
      "Commits data structure:",
      JSON.stringify(
        commitsData?.data?.user?.contributionsCollection
          ?.commitContributionsByRepository || "No commits data",
        null,
        2,
      ),
    );

    if (contributionsData.errors || commitsData.errors) {
      console.error(
        "GitHub GraphQL errors:",
        JSON.stringify(contributionsData.errors || commitsData.errors, null, 2),
      );
      return NextResponse.json(
        {
          error: "GitHub API error",
          details: contributionsData.errors || commitsData.errors,
        },
        { status: 500 },
      );
    }

    const calendar =
      contributionsData.data.user.contributionsCollection.contributionCalendar;
    const streaks = calculateStreaks(calendar.weeks);
    const repositories = contributionsData.data.user.repositories.nodes;
    // Check if commits data exists
    // Process the repositories to get commit data
    const repos = commitsData.data?.user?.repositories?.nodes || [];
    const recentCommits = repos
      .filter(
        (repo: any) => repo.defaultBranchRef?.target?.history?.totalCount > 0,
      )
      .map((repo: any) => ({
        repository: {
          name: repo.name,
          url: repo.url,
        },
        contributions: {
          nodes: [
            {
              commitCount:
                repo.defaultBranchRef?.target?.history?.totalCount || 0,
            },
          ],
        },
      }));

    console.log("Recent commits count:", recentCommits.length);

    return NextResponse.json({
      ...calendar,
      currentStreak: streaks.currentStreak,
      longestStreak: streaks.longestStreak,
      topRepositories: repositories,
      recentCommits: recentCommits,
    });
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 },
    );
  }
}
