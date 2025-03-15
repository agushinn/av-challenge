const express = require('express')

const app = express()
const router = express.Router()
const port = 8080

const JOBS = [
    {
        name: 'Junior Java Developer',
        salary: 25000,
        country: 'Brazil',
        skills: ['Java', 'OOP'],
    },
    {
        name: 'Mid-level Java Developer',
        salary: 35000,
        country: 'Argentina',
        skills: ['Java', 'OOP', 'Design Patterns'],
    },
    {
        name: 'Senior Java Developer',
        salary: 45000,
        country: 'Brazil',
        skills: ['Java', 'OOP', 'Design Patterns'],
    },
    {
        name: 'Junior PHP Developer',
        salary: 25000,
        country: 'Portugal',
        skills: ['PHP', 'OOP'],
    },
    {
        name: 'Mid-level PHP Developer',
        salary: 35000,
        country: 'Argentina',
        skills: ['PHP', 'OOP', 'Design Patterns'],
    },
    {
        name: 'Senior PHP Developer',
        salary: 45000,
        country: 'Brazil',
        skills: ['PHP', 'OOP', 'Design Patterns'],
    },
    {
        name: 'Business Analyst',
        salary: 39000,
        country: 'Brazil',
        skills: ['UX'],
    },
    {
        name: 'Junior Python Developer',
        salary: 29000,
        country: 'Canada',
        skills: ['Python', 'OOP'],
    },
    {
        name: 'React Developer',
        salary: 50000,
        country: 'Brazil',
        skills: ['React', 'TypeScript'],
    },
    {
        name: 'Angular Developer',
        salary: 50000,
        country: 'Brazil',
        skills: ['Angular', 'TypeScript'],
    },
    {
        name: 'Database Analyst',
        salary: 35000,
        country: 'Portugal',
        skills: ['MySQL'],
    },
    {
        name: 'Database Administrator',
        salary: 45000,
        country: 'Brazil',
        skills: ['MySQL', 'Percona'],
    },
    {
        name: 'Linux Administrator',
        salary: 44000,
        country: 'Canada',
        skills: ['Linux', 'Docker'],
    },
    {
        name: 'Windows Server Administrator',
        salary: 45000,
        country: 'Brazil',
        skills: ['Windows Server'],
    },
    {
        name: 'Junior UX Designer',
        salary: 26000,
        country: 'Argentina',
        skills: ['UX'],
    },
    {
        name: 'Senior UX Designer',
        salary: 41000,
        country: 'Brazil',
        skills: ['UX'],
    },
    { name: 'Go Developer', salary: 51000, country: 'Canada', skills: ['Go'] },
    {
        name: 'Junior C# Developer',
        salary: 31000,
        country: 'USA',
        skills: ['C#', 'OOP'],
    },
    {
        name: 'Mid-level C# Developer',
        salary: 47000,
        country: 'Canada',
        skills: ['C#', 'OOP', 'Design Patterns'],
    },
    {
        name: 'Senior C# Developer',
        salary: 51000,
        country: 'Argentina',
        skills: ['C#', 'OOP', 'Design Patterns'],
    },
    {
        name: 'Senior C++ Developer',
        salary: 51000,
        country: 'USA',
        skills: ['C++', 'OOP', 'Design Patterns'],
    },
    {
        name: 'Senior C Developer',
        salary: 55000,
        country: 'USA',
        skills: ['C', 'Design Patterns'],
    },
    {
        name: 'Ruby Developer',
        salary: 35000,
        country: 'USA',
        skills: ['Ruby', 'OOP'],
    },
    {
        name: 'Business Intelligence Analyst',
        salary: 31000,
        country: 'Argentina',
        skills: ['BI'],
    },
    {
        name: 'Chief Technology Officer',
        salary: 101000,
        country: 'Argentina',
        skills: [],
    },
    {
        name: 'Network Engineer',
        salary: 41000,
        country: 'USA',
        skills: ['Networking', 'IT'],
    },
    {
        name: 'Kotlin Developer',
        salary: 51000,
        country: 'Portugal',
        skills: ['Kotlin', 'OOP'],
    },
    {
        name: 'Cloud Solutions Architect',
        salary: 66000,
        country: 'Canada',
        skills: ['AWS', 'Azure', 'Docker'],
    },
    {
        name: 'Data Analyst',
        salary: 71000,
        country: 'USA',
        skills: ['Python', 'Machine Learning', 'Statistics'],
    },
    {
        name: 'Machine Learning Specialist',
        salary: 76000,
        country: 'Portugal',
        skills: ['Python', 'TensorFlow', 'Deep Learning'],
    },
    {
        name: 'DevOps Specialist',
        salary: 61000,
        country: 'Canada',
        skills: ['CI/CD', 'Docker', 'Kubernetes'],
    },
    {
        name: 'Cybersecurity Analyst',
        salary: 73000,
        country: 'USA',
        skills: ['Security', 'Penetration Testing'],
    },
    {
        name: 'Project Coordinator',
        salary: 56000,
        country: 'Portugal',
        skills: ['Project Management', 'Agile'],
    },
    {
        name: 'Mobile Developer',
        salary: 49000,
        country: 'Brazil',
        skills: ['iOS', 'Android', 'Flutter'],
    },
    {
        name: 'Blockchain Engineer',
        salary: 91000,
        country: 'Canada',
        skills: ['Blockchain', 'Solidity'],
    },
    {
        name: 'Game Programmer',
        salary: 54000,
        country: 'Canada',
        skills: ['Unity', 'C#'],
    },
    {
        name: 'AI Research Engineer',
        salary: 86000,
        country: 'Portugal',
        skills: ['AI', 'Machine Learning', 'Python'],
    },
    {
        name: 'Full Stack Engineer',
        salary: 59000,
        country: 'Brazil',
        skills: ['JavaScript', 'Node.js', 'React'],
    },
    {
        name: 'Technical Lead',
        salary: 76000,
        country: 'Portugal',
        skills: ['Leadership', 'Java', 'Agile'],
    },
    {
        name: 'Agile Coach',
        salary: 66000,
        country: 'Canada',
        skills: ['Scrum', 'Agile', 'Project Management'],
    },
    {
        name: 'Frontend Engineer',
        salary: 55000,
        country: 'Brazil',
        skills: ['HTML', 'CSS', 'JavaScript'],
    },
    {
        name: 'Backend Engineer',
        salary: 60000,
        country: 'Portugal',
        skills: ['Java', 'Spring', 'Microservices'],
    },
]

function convertSkillsToXML(skillsArray) {
    return (
        skillsArray.reduce((xmlString, skill) => {
            return xmlString + `<skill>${skill}</skill>`
        }, '<skills>') + '</skills>'
    )
}

app.listen(port, () => {
    console.log('listening port ' + port)
})

router.get('/jobs', (req, res) => {
    try {
        let name = req.query.name
        let salary_min = req.query.salary_min
        let salary_max = req.query.salary_max
        let country = req.query.country
        res.send(
            JOBS.filter(
                (job) =>
                    (name === undefined ||
                        job.name.toLowerCase().includes(name.toLowerCase())) &&
                    (salary_min === undefined || job.salary >= salary_min) &&
                    (salary_max === undefined || job.salary <= salary_max) &&
                    (country === undefined ||
                        job.country.toLowerCase() === country.toLowerCase())
            ).reduce((groupedJobs, job) => {
                const country = job.country
                if (!groupedJobs[country]) {
                    groupedJobs[country] = []
                }
                groupedJobs[country].push([
                    job.name,
                    job.salary,
                    convertSkillsToXML(job.skills),
                ])
                return groupedJobs
            }, {})
        )
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.toString() })
    }
})

app.use('/api/v1', router)
