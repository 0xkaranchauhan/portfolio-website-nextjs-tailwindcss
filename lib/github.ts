export interface GitHubStats {
  totalCommits: number;
  totalStars: number;
  totalRepos: number;
  totalFollowers: number;
  contributionYears: number[];
}

export interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

export interface LanguageStats {
  [language: string]: number;
}

const GITHUB_USERNAME = "0xkaranchauhan";
const GITHUB_API = "https://api.github.com";

export async function getGitHubStats(): Promise<GitHubStats> {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`),
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100`),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error("Failed to fetch GitHub data");
    }

    const userData = await userResponse.json();
    const reposData = await reposResponse.json();

    const totalStars = reposData.reduce(
      (acc: number, repo: any) => acc + repo.stargazers_count,
      0,
    );

    const contributionYears: number[] = Array.from(
      new Set(
        reposData
          .map((repo: any) => new Date(repo.created_at).getFullYear())
          .sort((a: number, b: number) => b - a),
      ),
    ) as number[];

    return {
      totalCommits: 0,
      totalStars,
      totalRepos: userData.public_repos,
      totalFollowers: userData.followers,
      contributionYears,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return {
      totalCommits: 0,
      totalStars: 0,
      totalRepos: 0,
      totalFollowers: 0,
      contributionYears: [],
    };
  }
}

export async function getTopRepositories(
  limit: number = 6,
): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=stars`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const repos = await response.json();

    return repos
      .filter((repo: any) => !repo.fork)
      .slice(0, limit)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description || "No description available",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || "Unknown",
        url: repo.html_url,
      }));
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}

export async function getLanguageStats(): Promise<LanguageStats> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch language stats");
    }

    const repos = await response.json();
    const languageCounts: LanguageStats = {};

    repos.forEach((repo: any) => {
      if (repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1;
      }
    });

    const total = Object.values(languageCounts).reduce((a, b) => a + b, 0);
    const languagePercentages: LanguageStats = {};

    Object.entries(languageCounts).forEach(([lang, count]) => {
      languagePercentages[lang] = Math.round((count / total) * 100);
    });

    return Object.fromEntries(
      Object.entries(languagePercentages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5),
    );
  } catch (error) {
    console.error("Error fetching language stats:", error);
    return {};
  }
}

export function getGitHubContributionGraphUrl(
  username: string = GITHUB_USERNAME,
): string {
  return `https://ghchart.rshah.org/${username}`;
}
