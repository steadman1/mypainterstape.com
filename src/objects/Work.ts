import Color from './Color';

enum WorkDetailType {
    DESCRIPTION,
    DESCRIPTION_WITH_LOGO,
    DESCRIPTION_WITH_IMAGE,
    DESCRIPTION_WITH_MANY_IMAGES,
    DESCRIPTION_WITH_VIDEO,
    CALL_TO_ACTION,
}

enum WorkType {
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
    description?: string;

    video?: string;

    URL?: string;

    // constructor with named arguments
    constructor(
        type: WorkDetailType,
        images: string[],
        ctaTye: CallToActionType,
        title: string,
        description?: string,
        video?: string,
        URL?: string,
    ) {
        this.type = type;
        this.title = title;
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
}

export { Work, WorkDetail, WorkType, WorkDetailType, CallToActionType };