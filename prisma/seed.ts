import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
    {
        email: 'zakjak456@gmail.com',
        isAdmin: true,
        articles: {
            create: [
                {
                    title: 'Officials have been planning for weeks to send National Guard to Chicago as Trump seeks to expand crime crackdown',
                    category: 'politics',
                    images: {
                        create: [
                            {
                                image: 'https://cloudfront-us-east-1.images.arcpublishing.com/archetype/EP55V3YMRVG23INETEPYNMPW5M.jpg',
                            },
                            {
                                image: 'data:image/jpeg;base64,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',
                            }
                        ]
                    },
                    imageCredit: 'zakjak',

                    story: "The Trump administration has been planning for weeks to send the National Guard to Chicago, two officials told CNN, as President Donald Trump looks to expand his anti-crime agenda and crackdown on immigration in major cities across the United States. It is not yet clear how many troops would be sent to Chicago, or when those deployments would start. Trump seemed to preview those plans in the Oval Office on Friday, saying, “I think Chicago will be our next, and then we’ll help with New York.” Chicago Mayor Brandon Johnson, a Democrat, said Friday that the city has not heard from the White House about the deployment or any increased law enforcement presence, adding that such a move would be “uncalled for” and “unlawful.”",
                    keywords: {
                        create: [
                            {
                                name: 'politics',
                            },
                            {
                                name: 'war'
                            },
                            {
                                name: 'military'
                            }
                        ]
                    }
                },
                {
                    title: "It’s Virgo season. Netflix has a show for that",
                    category: 'entertainment',
                    images: {
                        create: [
                            {
                                image: 'https://media.cnn.com/api/v1/images/stellar/prod/netflix-astrology-collection.jpg?c=16x9&q=w_1383,c_fill',
                            }
                        ]
                    },
                    imageCredit: 'zakjak',
                    story: "Your next Netflix binge might just be written in the stars. As we enter Virgo season, the streaming giant is launching a collection in which users can explore hundreds of titles “through the lens of the zodiac, with rows curated for each star sign and titles that reflect their unique traits. ”Picture it: Cancers snuggled up with comforting, heartfelt dramas, Scorpios brooding over mysteries and Geminis…well, they’re probably starting three shows at once. Mansi Patel, Netflix’s Senior Director with Product Discovery, told CNN that she and her team are always looking for new ways of curating movies and series on the platform. “This specific one, I think is a really fun, culturally relevant way to get into your favorite show or film that feels really personal to you,” Patel said. The idea for zodiac watchlists, however, was more than just vibes. “This one came up because we noticed that Mercury was in retrograde,” she said, laughing. “And it was around the release of [Netflix’s hit sci-fi series] ‘Black Mirror.’” Mercury in retrograde is usually associated with technical glitches, delays and communication mixups. While that didn’t impact the rollout of “Black Mirror” last spring, Patel said it got her team thinking about astrology and content. They brainstormed different ideas before ultimately aligning personality qualities associated with the 12 astrological signs to a selection of entertainment that might appeal to each group.",
                    keywords: {
                        create: [
                            {
                                name: 'entainment',
                            },
                            {
                                name: 'netflix'
                            },
                            {
                                name: 'movie'
                            }
                        ]
                    }
                },
                {
                    title: 'Jerome Powell hints long-awaited rate cuts are coming soon — the first during Trump’s term',
                    category: 'business',
                    images: {
                        create: [
                            {
                                image: 'https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2225581624.jpg?c=original&q=w_860,c_fill/f_avif',
                            }
                        ]
                    },
                    imageCredit: 'CNN',
                    story: "Washington — The job market is on such shaky ground that the Federal Reserve may soon need to cut interest rates to support the economy, Fed Chair Jerome Powell said Friday at a key central banking forum. In one of his most consequential speeches, Powell suggested the labor market could benefit from lower rates, which the Fed has kept unchanged for eight straight months. “Downside risks to employment are rising,” Powell said in prepared remarks for his keynote speech at the Federal Reserve Bank of Kansas City’s annual economic symposium in Jackson Hole, Wyoming. He said the possibility of Trump’s tariffs having only a short-lived effect on inflation is “reasonable.” “With policy in restrictive territory, the baseline outlook and the shifting balance of risks may warrant adjusting our policy stance,” he added.",
                    keywords: {
                        create: [
                            {
                                name: 'business',
                            },
                            {
                                name: 'washinhton'
                            },
                            {
                                name: 'kansas'
                            }
                        ]
                    }
                },
                {
                    title: 'A colonial hangover or a linguistic leg-up? India grapples with the enduring appeal of English',
                    category: 'culture',
                    images: {
                        create: [
                            {
                                image: 'https://media.cnn.com/api/v1/images/stellar/prod/01-ap25190626140055.jpg?c=16x9&q=w_2000,c_fill/f_avif',
                            }
                        ]
                    },
                    imageCredit: 'CNN',
                    story: "New Delhi — When British traders landed on India’s shores in the 1600s, they arrived in search of spices and silk but stayed for centuries – leaving behind a legacy that would shape the nation long after their colonial exploitation ended: the English language. Over the centuries, English seeped into the very fabric of Indian life – first as a tool of commerce, then as the language of law and, eventually, a marker of privilege. Now, after more than a decade of Hindu-nationalist rule, Prime Minister Narendra Modi’s Bharatiya Janata Party (BJP) is mounting perhaps the most significant challenge yet to the language’s place in India.",
                    keywords: {
                        create: [
                            {
                                name: 'english',
                            },
                            {
                                name: 'india'
                            },
                            {
                                name: 'colonialism'
                            }
                        ]
                    }
                },
                {
                    title: 'The 23 tech products our editors truly loved in 2024',
                    category: 'technology',
                    images: {
                        create: [
                            {
                                image: 'https://media.cnn.com/api/v1/images/stellar/prod/2024-tech-cnnu.jpg?c=16x9&q=h_653,w_1160,c_fill/f_avif',
                            }
                        ]
                    },
                    imageCredit: 'CNN',
                    story: 'We review dozens of electronics every year here at Underscored, but more importantly, we’re just regular ol’ people in search of cool stuff to make our lives easier and more fun. So, as we reflect on the best gadgets we used this year, we’re not just thinking of the fancy phones and computers that got high marks in our tests — though those are certainly included. We’re also thinking of that cheap phone grip we can’t imagine traveling without, that fitness band that helped us take better care of ourselves or the full-on arcade machine we simply had to set up in our apartment for “work.”After countless hours of testing and truly living with every type of tech you can think of, here are the gadgets our editors fell in love with in 2024. One of them just might become the next great gift you get for someone special or just something cool to treat yourself to.',
                    keywords: {
                        create: [
                            {
                                name: 'innovation',
                            },
                            {
                                name: 'computer'
                            },
                            {
                                name: 'electronics'
                            }
                        ]
                    }
                },
                {
                    title: '‘An existential threat’: For Silicon Valley, falling behind in AI is a bigger threat than tariffs',
                    category: 'innovation',
                    images: {
                        create: [
                            {
                                image: 'https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2194528029.jpg?c=original&q=w_860,c_fill/f_avif',
                            }
                        ]
                    },
                    imageCredit: 'CNN',
                    story: "New York — If there’s one thing the White House, Wall Street and Silicon Valley can agree on, it’s that artificial intelligence is a top priority.= Tech giants are pouring billions into new data centers and infrastructure to support the technology. The White House came out with an AI action plan in July to boost America’s leadership in the space, underscoring the tech’s importance to the administration. Wall Street keeps pushing AI-related stocks like Nvidia (NVDA) to new records. But President Donald Trump’s trade war has raised questions about whether the administration’s policies could work against its big AI push. Certain tariffs could raise the costs of materials and components necessary to support those AI models.",
                    keywords: {
                        create: [
                            {
                                name: 'innovation',
                            },
                            {
                                name: 'AI'
                            },
                            {
                                name: 'silicon valley'
                            }
                        ]
                    }
                },
            ]
        }
    }
]

export async function main(){
    for(const u of userData){
        await prisma.user.create({data: u})
    }
}

main()