import { NextResponse } from "next/server";

const CF_HANDLE = "Vedant_Cool_Karni";
const LC_HANDLE = "Vedant_Cool_Karni";
const CC_HANDLE = "same_vigor_92";

async function getCFStats(handle: string) {
    try {
        const [infoRes, statusRes] = await Promise.all([
            fetch(`https://codeforces.com/api/user.info?handles=${handle}`, { next: { revalidate: 3600 } }),
            fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`, { next: { revalidate: 3600 } }),
        ]);

        const infoData = await infoRes.json();
        const statusData = await statusRes.json();

        if (infoData.status !== "OK") return null;

        const user = infoData.result[0];

        // Count unique problems solved (verdict OK, unique by contestId+index)
        const solved = new Set<string>();
        if (statusData.status === "OK") {
            for (const sub of statusData.result) {
                if (sub.verdict === "OK") {
                    solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
                }
            }
        }

        return {
            handle: user.handle,
            rating: user.rating ?? 0,
            maxRating: user.maxRating ?? 0,
            rank: user.rank ?? "unrated",
            maxRank: user.maxRank ?? "unrated",
            solved: solved.size,
            profileUrl: `https://codeforces.com/profile/${handle}`,
        };
    } catch {
        return null;
    }
}

async function getCCStats(handle: string) {
    try {
        const res = await fetch(`https://www.codechef.com/users/${handle}`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            },
            next: { revalidate: 3600 },
        });
        const html = await res.text();

        // Current rating: appears as  class='rating'>1575 (
        const ratingMatch = html.match(/class='rating'>\s*(\d+)\s*\(/);
        const rating = ratingMatch ? parseInt(ratingMatch[1]) : null;

        // Highest rating: appears as (Highest Rating 1575)
        const maxRatingMatch = html.match(/Highest Rating\s+(\d+)/);
        const maxRating = maxRatingMatch ? parseInt(maxRatingMatch[1]) : null;

        // Stars: count &#9733; occurrences inside rating-star div
        const starBlockMatch = html.match(/class="rating-star">([\s\S]*?)<\/div>/);
        const stars = starBlockMatch
            ? (starBlockMatch[1].match(/&#9733;/g) || []).length
            : null;

        // Number of fully solved problems from profile (if exposed)
        const solvedMatch = html.match(/(\d+)\s*(?:Completely Solved|Problems Solved)/i);
        const solved = solvedMatch ? parseInt(solvedMatch[1]) : null;

        return {
            handle,
            rating,
            maxRating,
            stars,
            solved,
            profileUrl: `https://www.codechef.com/users/${handle}`,
        };
    } catch {
        return null;
    }
}

async function getLCStats(handle: string) {
    try {
        const query = `
            query getUserProfile($username: String!) {
                matchedUser(username: $username) {
                    submitStats {
                        acSubmissionNum {
                            difficulty
                            count
                        }
                    }
                    profile {
                        ranking
                    }
                }
            }
        `;
        const res = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, variables: { username: handle } }),
            next: { revalidate: 3600 }
        });
        const data = await res.json();
        
        const matchedUser = data?.data?.matchedUser;
        if (!matchedUser) return null;
        
        const solved = matchedUser.submitStats.acSubmissionNum.find((item: any) => item.difficulty === "All")?.count || 0;
        const ranking = matchedUser.profile.ranking;
        
        return {
            handle,
            solved,
            ranking,
            profileUrl: `https://leetcode.com/${handle}`
        };
    } catch {
        return null;
    }
}

export async function GET() {
    const [cf1, lc, cc] = await Promise.all([
        getCFStats(CF_HANDLE),
        getLCStats(LC_HANDLE),
        getCCStats(CC_HANDLE),
    ]);

    return NextResponse.json({ cf1, lc, cc });
}
