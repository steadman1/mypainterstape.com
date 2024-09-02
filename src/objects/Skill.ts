enum SkillType {
    WEB = "Web",
    FRAMEWORKS = "Frameworks",
    PROGRAMMING = "Programming",
    LIBRARIES = "Libraries",
    ADOBE = "Adobe Suite",
    APPLICATIONS = "Applications",
    CORPORATE = "Corporate",
    OTHER = "Other",
}

class Skill {
    image: string | null;
    type: SkillType;
    name: string;
    level: number | undefined = undefined;
    started: Date | undefined = undefined;
    hasFieldExperience: boolean | undefined = undefined;
    related: Skill[] = [];

    constructor(image: string | null, type: SkillType, name: string, related: Skill[] = []) {
        this.image = image;
        this.type = type;
        this.name = name;
        this.related = related;
    }

    public clone(): Skill {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    public complete(level: number, started: Date, hasFieldExperience: boolean): Skill {
        this.level = level;
        this.started = started;
        this.hasFieldExperience = hasFieldExperience;

        return this;
    }

    public getLevel(): number {
        if (!this.level) return -1;
        return this.level;
    }

    public yearsExperience(): number {
        if (!this.started) return 0;
        return new Date().getFullYear() - this.started.getFullYear();
    }

    public getFieldExperience(): boolean {
        if (!this.hasFieldExperience) return false;
        return this.hasFieldExperience;
    }

    public getRelatedNames(): string {
        let relatedNames = "";
        for (let i = 0; i < this.related.length; i++) {
            relatedNames += this.related[i].name;
            if ((i + 2) < this.related.length) relatedNames += ", ";
            else if ((i + 2) === this.related.length && this.related.length == 2) relatedNames += " & ";
            else if ((i + 2) === this.related.length) relatedNames += ", & ";
        }
        return relatedNames;
    }

    static skillTypes: SkillType[] = [
        SkillType.PROGRAMMING,
        SkillType.FRAMEWORKS,
        SkillType.LIBRARIES,
        SkillType.WEB,
        SkillType.ADOBE,
        SkillType.APPLICATIONS,
        SkillType.CORPORATE,
        SkillType.OTHER,
    ];

    // Other
    static ui_ux = new Skill("compressed/ui_ux-min.png", SkillType.OTHER, "UI/UX");
    static animation = new Skill("compressed/animation-min.png", SkillType.OTHER, "Animation");
    static graphic_design = new Skill("compressed/graphic_design-min.png", SkillType.OTHER, "Graphic Design");
    static data_analysis = new Skill("compressed/data_analysis-min.png", SkillType.OTHER, "Data Analysis");
    static data_visualization = new Skill("compressed/data_visualization-min.png", SkillType.OTHER, "Data Visualization");
    static and_more = new Skill("compressed/and_more-min.png", SkillType.LIBRARIES, "More");

    // Corporate
    static excel = new Skill("compressed/excel-min.png", SkillType.CORPORATE, "Excel", [Skill.data_analysis, Skill.data_visualization]);
    static job_boss_2 = new Skill("compressed/job_boss_2-min.png", SkillType.CORPORATE, "JobBoss2");
    static tableau = new Skill("compressed/tableau-min.png", SkillType.CORPORATE, "Tableau", [Skill.data_visualization]);

    // Web
    static html = new Skill("compressed/html-min.png", SkillType.WEB, "HTML");
    static css = new Skill("compressed/css-min.png", SkillType.WEB, "CSS");

    // Frameworks
    static react = new Skill("compressed/react-min.png", SkillType.FRAMEWORKS, "React", [Skill.html, Skill.css]);
    static dart = new Skill("compressed/dart-min.png", SkillType.FRAMEWORKS, "Dart");
    static flutter = new Skill("compressed/flutter-min.png", SkillType.FRAMEWORKS, "Flutter", [Skill.dart, Skill.ui_ux]);
    static ui_kit = new Skill("compressed/ui_kit-min.png", SkillType.FRAMEWORKS, "UIKit");
    static swift_ui = new Skill("compressed/swift_ui-min.png", SkillType.FRAMEWORKS, "Swift UI");

    // Libraries
    static pandas = new Skill("compressed/pandas-min.png", SkillType.FRAMEWORKS, "Pandas");
    static numpy = new Skill("compressed/numpy-min.png", SkillType.FRAMEWORKS, "NumPy");

    // Programming
    static python = new Skill("compressed/python-min.png", SkillType.PROGRAMMING, "Python", [Skill.pandas, Skill.numpy, Skill.and_more]);
    static javascript = new Skill("compressed/javascript-min.png", SkillType.PROGRAMMING, "JavaScript");
    static typescript = new Skill("compressed/typescript-min.png", SkillType.PROGRAMMING, "TypeScript", [Skill.javascript]);
    static swift_5 = new Skill("compressed/swift_5-min.png", SkillType.PROGRAMMING, "Swift 5", [Skill.swift_ui, Skill.ui_kit, Skill.ui_ux]);
    static java = new Skill("compressed/java-min.png", SkillType.PROGRAMMING, "Java");
    static c = new Skill("compressed/c-min.png", SkillType.PROGRAMMING, "C");
    static c_plus_plus = new Skill("compressed/c_plus_plus-min.png", SkillType.PROGRAMMING, "C++", [Skill.c]);
    static r = new Skill("compressed/r-min.png", SkillType.PROGRAMMING, "R");

    // Adobe
    static photoshop = new Skill("compressed/photoshop-min.png", SkillType.ADOBE, "Photoshop", [Skill.graphic_design]);
    static illustrator = new Skill("compressed/illustrator-min.png", SkillType.ADOBE, "Illustrator", [Skill.graphic_design]);
    static premiere_pro = new Skill("compressed/premiere_pro-min.png", SkillType.ADOBE, "Premiere Pro", [Skill.animation]);
    static after_effects = new Skill("compressed/after_effects-min.png", SkillType.ADOBE, "After Effects", [Skill.animation]);

    // Applications
    static figma = new Skill("compressed/figma-min.png", SkillType.APPLICATIONS, "Figma", [Skill.ui_ux, Skill.graphic_design]);
    static blender = new Skill("compressed/blender-min.png", SkillType.APPLICATIONS, "Blender", [Skill.animation]);
}

export { Skill, SkillType };