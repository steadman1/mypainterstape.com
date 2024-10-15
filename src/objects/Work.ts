import { Color } from './Color';

enum WorkDetailType {
    DESCRIPTION,
    DESCRIPTION_WITH_LOGO,
    DESCRIPTION_WITH_IMAGE,
    DESCRIPTION_WITH_MANY_IMAGES,
    DESCRIPTION_WITH_VIDEO,
    CALL_TO_ACTION,
}

enum WorkType {
    INTRO,
    IOSAPP,
    WEBAPP,
    DESIGN,
}

enum CallToActionType {
    CONTINUE,
    DOWNLOAD_URL_WITH_NEXT,
}

class WorkDetail {
    type: WorkDetailType;

    images: string[];

    ctaType: CallToActionType;

    title: string;
    subtitle?: string;
    description?: string;

    video?: string;

    URL?: string;

    // constructor with named arguments
    constructor(
        type: WorkDetailType,
        images: string[],
        ctaTye: CallToActionType,
        title: string,
        subtitle?: string,
        description?: string,
        video?: string,
        URL?: string,
    ) {
        this.type = type;
        this.title = title;
        this.subtitle = subtitle;
        this.ctaType = ctaTye;
        this.description = description;
        this.images = images;
        this.video = video;
        this.URL = URL;
    }
}

class Work {
    name: string;
    workType: WorkType;

    foregroundColor: Color;
    middlegroundColor: Color;
    backgroundColor: Color;

    lightAccentColor: Color;
    darkAccentColor: Color;

    primaryTextColor: Color;
    secondaryTextColor: Color;

    usesStroke: boolean;

    titleFont: string;
    subtitleFont: string;
    bodyFont: string;
    
    details: WorkDetail[];

    constructor(
        name: string,
        workType: WorkType,
        foregroundColor: Color,
        middlegroundColor: Color,
        backgroundColor: Color,
        lightAccentColor: Color,
        darkAccentColor: Color,
        primaryTextColor: Color,
        secondaryTextColor: Color,
        usesStroke: boolean,
        titleFont: string,
        subtitleFont: string,
        bodyFont: string,
        details: WorkDetail[],
    ) {
        this.name = name;
        this.workType = workType;
        this.foregroundColor = foregroundColor;
        this.middlegroundColor = middlegroundColor;
        this.backgroundColor = backgroundColor;
        this.lightAccentColor = lightAccentColor;
        this.darkAccentColor = darkAccentColor;
        this.primaryTextColor = primaryTextColor;
        this.secondaryTextColor = secondaryTextColor;
        this.usesStroke = usesStroke;
        this.titleFont = titleFont;
        this.subtitleFont = subtitleFont;
        this.bodyFont = bodyFont;
        this.details = details;
    }

    static intro = new Work(
        "Intro",
        WorkType.INTRO,
        
        // Ground Colors
        new Color("#FFFFFF"),
        new Color("#1a57e3"),
        new Color("#FFFFFF"),

        // Accent Colors
        new Color("#1a57e3"),
        new Color("#FFFFFF"),

        // Text Colors
        new Color("#1a57e3"),
        new Color("#FFFFFF"),

        // UI Stroke
        true,

        // Fonts
        "integral",
        "times-new-roman-condensed",
        "times-new-roman-condensed",
        
        // Work Details
        [
            new WorkDetail(
                WorkDetailType.DESCRIPTION_WITH_LOGO,
                ["asterisk.png"],
                CallToActionType.CONTINUE,
                "Explore our work.",
                "Made with Love.",
                "-pt & spencer steadman"
            ),
        ]
    )
    static ponderWork = new Work(
        "Ponder",
        WorkType.IOSAPP,
        
        // Ground Colors
        new Color("#69709D"),
        new Color("#434660"),
        new Color("#22223B"),

        // Accent Colors
        new Color("#B47DF2"),
        new Color("#504177"),

        // Text Colors
        new Color("#FFFFFF"),
        new Color("#A9A9A9"),

        // UI Stroke
        false,

        // Fonts
        "Manrope",
        "Manrope",
        "Manrope",
        
        // Work Details
        [
            new WorkDetail(
                WorkDetailType.DESCRIPTION_WITH_LOGO,
                ["ponder/ponder-full-cloud.png",],
                CallToActionType.CONTINUE,
                "Introducing Ponder, your intelligent _Dream Journal._",
            ),
            new WorkDetail(
                WorkDetailType.DESCRIPTION_WITH_IMAGE,
                [
                    "ponder/intro_preview.png",
                ],
                CallToActionType.CONTINUE,
                "Explore Lucid Dreaming",
                undefined,
                "Ponder is designed to help you learn and explore the world of lucid dreaming. With an array of advanced features, Ponder is the perfect companion for your lucid dreaming journey.",
            ),
            new WorkDetail(
                WorkDetailType.DESCRIPTION_WITH_MANY_IMAGES,
                [
                    "ponder/motifs_preview.png",
                    "ponder/recall_preview.png",
                    "ponder/image_gen_preview.png",
                ],
                CallToActionType.CONTINUE,
                "Improve Dream Recall",
                undefined,
                "Ponder aims to help you improve your ability to recall dreams every morning. With _motif tracking_ and _image generation,_ Ponder supercharges the dream journal experience with organizational tools and Dall•E 3 image diffusion to help with every step. (1) Based on research studying the effect of dream diaries on improving recall from Schredl, M. (2018). Dream Recall. In: Researching Dreams. Palgrave Macmillan, Cham, dream journals showed up to 3x improvement in dream recall over a 2 week period of consistent use.",
            ),
            new WorkDetail(
                WorkDetailType.DESCRIPTION_WITH_MANY_IMAGES,
                [
                    "ponder/analysis_preview.png",
                    "ponder/guides_preview.png",
                    "ponder/dreams_talk_preview.png",
                ],
                CallToActionType.CONTINUE,
                "Learn, Analyze, and Understand",
                undefined,
                "With Ponder's advanced _dream analysis tools_ and personalized _dream insights,_ get the most out of every dream and better understand your subsconscious. Let us take the guesswork out of dream interpretation and help you understand the deeper meaning behind your dreams.",
            ),
            new WorkDetail(
                WorkDetailType.DESCRIPTION_WITH_IMAGE,
                [
                    "ponder/goals_preview.png",
                ],
                CallToActionType.CONTINUE,
                "Set Goals and Achieve",
                undefined,
                "Set goals with Ponder's _dream goal tracking_ feature and achieve them with the help of our guided beginner dream experiences. Ponder is designed to help you achieve your dream goals and improve your lucid dreaming journey.",
            ),
            new WorkDetail(
                WorkDetailType.CALL_TO_ACTION,
                ["ponder/ponder-app-icon.png"],
                CallToActionType.DOWNLOAD_URL_WITH_NEXT,
                "Ponder: Lucid Dream Journal",
                "Dream Deeper with Ponder.",
                "Coming soon to the iOS App Store.",
                undefined,
                "https://apps.apple.com/us/app/ponder-lucid-dream-journal/id6587549184",
            ),
        ]
    )
    static lotusWork = new Work(
        "Lotus",
        WorkType.IOSAPP,
        
        // Ground Colors
        new Color("#FFFFFF"),
        new Color("#000000"),
        new Color("#FFFFFF"),

        // Accent Colors
        new Color("#000000"),
        new Color("#FFFFFF"),

        // Text Colors
        new Color("#000000"),
        new Color("#FFFFFF"),

        // UI Stroke
        true,

        // Fonts
        "Newake Demo",
        "times-new-roman-condensed",
        "times-new-roman-condensed",

        // Work Details
        [
            new WorkDetail(
                WorkDetailType.DESCRIPTION,
                [],
                CallToActionType.CONTINUE,
                "Introducing Lotus, your new Spotify Companion.",
                "Coming soon to the iOS App Store."
            )
        ]
    )

    static works = [
        Work.intro,
        Work.ponderWork,
        Work.lotusWork,
    ];
}

export { Work, WorkDetail, WorkType, WorkDetailType, CallToActionType };