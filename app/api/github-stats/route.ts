import { NextResponse } from "next/server";

const GH_USER = "Vedant1703";

export async function GET() {
    try {
        const headers: HeadersInit = {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        };

        // Fetch profile + all repos + recent events in parallel
        const [profileRes, reposRes, eventsRes] = await Promise.all([
            fetch(`https://api.github.com/users/${GH_USER}`, { headers, next: { revalidate: 3600 } }),
            fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`, { headers, next: { revalidate: 3600 } }),
            fetch(`https://api.github.com/users/${GH_USER}/events/public?per_page=100`, { headers, next: { revalidate: 1800 } }),
        ]);

        const [profile, repos, events] = await Promise.all([
            profileRes.json(),
            reposRes.json(),
            eventsRes.json(),
        ]);

        // Aggregate repo stats
        const ownRepos = repos.filter((r: { fork: boolean }) => !r.fork);
        const totalStars = repos.reduce((s: number, r: { stargazers_count: number }) => s + r.stargazers_count, 0);
        const totalForks = repos.reduce((s: number, r: { forks_count: number }) => s + r.forks_count, 0);

        // Language frequency from own repos
        const langMap: Record<string, number> = {};
        for (const r of ownRepos) {
            if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
        }
        const topLanguages = Object.entries(langMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([lang, count]) => ({ lang, count }));

        // Parse recent events for activity counts
        const now = Date.now();
        const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

        let recentCommits = 0;
        let recentPRs = 0;
        const recentActivity: { type: string; repo: string; time: string }[] = [];

        for (const ev of events) {
            const when = new Date(ev.created_at).getTime();
            if (ev.type === "PushEvent" && when > thirtyDaysAgo) {
                recentCommits += ev.payload?.commits?.length ?? 1;
            }
            if (ev.type === "PullRequestEvent") {
                recentPRs++;
            }
            if (recentActivity.length < 6 && ["PushEvent", "PullRequestEvent", "CreateEvent", "IssuesEvent"].includes(ev.type)) {
                recentActivity.push({
                    type: ev.type,
                    repo: ev.repo?.name ?? "",
                    time: ev.created_at,
                });
            }
        }

        // Account age in years
        const joined = new Date(profile.created_at);
        const yearsOnGH = Math.floor((Date.now() - joined.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

        return NextResponse.json({
            username: profile.login,
            name: profile.name,
            avatarUrl: profile.avatar_url,
            followers: profile.followers,
            publicRepos: profile.public_repos,
            ownRepos: ownRepos.length,
            totalStars,
            totalForks,
            yearsOnGH,
            topLanguages,
            recentCommits,
            recentPRs,
            recentActivity,
            profileUrl: `https://github.com/${GH_USER}`,
        });
    } catch {
        return NextResponse.json({ error: "Failed to fetch GitHub stats" }, { status: 500 });
    }
}
