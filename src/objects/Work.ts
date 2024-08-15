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
        "Inter",
        "Inter",
        
        // Work Details
        [
            new WorkDetail(
                WorkDetailType.DESCRIPTION_WITH_LOGO,
                ["ponder/ponder-full-cloud.png"],
                CallToActionType.CONTINUE,
                "Introducing Ponder, your new _Lucid Dreaming Journal._",
            ),
            new WorkDetail(
                WorkDetailType.DESCRIPTION_WITH_MANY_IMAGES,
                [
                    "ponder/Hold_The_Future_(Sony_Radio_Parody).png",
                    "ponder/Dont_Let_Dreams_Fleet.png",
                    "ponder/Dreams_Talk_(WSJ_Parody).png",
                    "ponder/Dreams_Take_Flight_(Corn_Flakes_Parody).png"
                ],
                CallToActionType.CONTINUE,
                "Dream Analysis",
                undefined,
                "With Ponder, dream deeper with advanced _dream analysis tools_ and personalized _dream insights._ Get the most out of every dream and better understand your subsconscious with Ponder.",
            ),
            new WorkDetail(
                WorkDetailType.DESCRIPTION_WITH_MANY_IMAGES,
                ["ponder/ponder-full-cloud.png"],
                CallToActionType.CONTINUE,
                "Dream Guides & Articles",
                undefined,
                "With Ponder's in-depth guides and articles, _learn to Lucid Dream_ and make _the most of every night's sleep._ Don't let your dreams fleet.",
            ),
            new WorkDetail(
                WorkDetailType.CALL_TO_ACTION,
                ["ponder/ponder-app-icon.png"],
                CallToActionType.DOWNLOAD_URL_WITH_NEXT,
                "Ponder: Lucid Dream Journal",
                "Dream Deeper—Night after Night.",
                "Available now on the _iOS App Store._",
                undefined,
                "https://apps.apple.com/us/",
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