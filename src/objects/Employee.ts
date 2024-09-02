import { Skill, SkillType } from "./Skill";

class Employee {
    image: string;
    name: string;
    title: string;
    description: string;
    skills: Skill[] = [];

    constructor(image: string, name: string, title: string, description: string, skills: Skill[] = []) {
        this.image = image;
        this.name = name;
        this.title = title;
        this.description = description;
        this.skills = skills;
    }

    public filterType(skillType: SkillType) {
        return this.skills.filter((skill: Skill) => skill.type === skillType);
    }

    static employees: Employee[] = [
        new Employee(
            "https://via.placeholder.com/150", 
            "Spencer Steadman", 
            "Founder & Lead Full-Stack Developer", 
            "As a _*computer science*_ student _*at Virginia Tech*_ and a self-taught, independent _*software engineer*_, I'm deeply passionate about computing and _*software development that fosters creativity and productivity.*_ Throughout my years of experience, I've cultivated a love for learning and expressing my creativity through various mediums, including _*programming, graphic design, and front-end UI/UX design.*_ With experience across the full tech stack, I’m incredibly excited to continue developing groundbreaking technology and crafting beautiful designs with Painter*s Tape Studios... _*Let's go Hokies!*_",
            [
                Skill.react.clone().complete(4, new Date(2022, 0, 1), true),
                Skill.flutter.clone().complete(3, new Date(2021, 0, 1), false),

                Skill.swift_5.clone().complete(5, new Date(2020, 0, 1), true),
                Skill.typescript.clone().complete(4, new Date(2021, 0, 1), true),
                Skill.python.clone().complete(5, new Date(2019, 0, 1), true),
                Skill.c_plus_plus.clone().complete(4, new Date(2023, 0, 1), true),
                Skill.java.clone().complete(4, new Date(2022, 0, 1), false),

                Skill.photoshop.clone().complete(5, new Date(2016, 0, 1), true),
                Skill.illustrator.clone().complete(5, new Date(2022, 0, 1), true),
                Skill.premiere_pro.clone().complete(5, new Date(2016, 0, 1), true),
                Skill.after_effects.clone().complete(4, new Date(2022, 0, 1), true),

                Skill.figma.clone().complete(5, new Date(2020, 0, 1), true),
                Skill.blender.clone().complete(4, new Date(2020, 0, 1), false),

                Skill.excel.clone().complete(4, new Date(2019, 0, 1), true),
                Skill.job_boss_2.clone().complete(3, new Date(2023, 0, 1), true),
            ]
        ),

        new Employee(
            "https://via.placeholder.com/150", 
            "Ryan Pham", 
            "Junior Developer", 
            "I'm a _*computer science*_ and _*business administration*_ double-major at _*UNC Chapel Hill*_. As a _*junior software developer*_ and _*data analyst,*_ I'm always looking for a fun new project to work on. Having industry experience as an analyst, I hope to broaden my experiences in both the tech and business world through _*innovative product development*_ and _*market research*_. I'm very thrilled to be on the Painter*s Tape team... _*Go Tar Heels!*_",
            [
                Skill.html.clone().complete(4, new Date(2021, 0, 1), false),

                Skill.python.clone().complete(4, new Date(2023, 0, 1), false),
                Skill.java.clone().complete(2, new Date(2021, 0, 1), false),
                Skill.r.clone().complete(3, new Date(2023, 0, 1), false),

                Skill.photoshop.clone().complete(4, new Date(2016, 0, 1), true),
                Skill.premiere_pro.clone().complete(5, new Date(2016, 0, 1), true),

                Skill.excel.clone().complete(3, new Date(2021, 0, 1), true),
                Skill.tableau.clone().complete(3, new Date(2022, 0, 1), false),
            ]
        ),

        new Employee(
            "https://via.placeholder.com/150", 
            "Katie Ullmann", 
            "User Experience & Marketing Strategist", 
            "I'm a _*student*_ at the _*University of Virginia*_ pursuing a BA in _*Psychology*_ and a minor in _*Entrepreneurship*_. At Painter*s Tape Studios, I'm excited to bridge the gap between _*psychological theory and practical app design*_. With a keen interest in marketing, I also look forward to developing strategies that effectively showcase our user-focused designs and innovative technologies... _*Go Hoos!*_",
            [
                Skill.python.clone().complete(2, new Date(2023, 0, 1), false),
                Skill.r.clone().complete(2, new Date(2023, 0, 1), false),
                
                Skill.photoshop.clone().complete(3, new Date(2022, 0, 1), false),
                Skill.premiere_pro.clone().complete(3, new Date(2022, 0, 1), false),

                Skill.excel.clone().complete(3, new Date(2021, 0, 1), false),

                Skill.figma.clone().complete(4, new Date(2022, 0, 1), false),
            ]
        ),
    ];
}

export default Employee;