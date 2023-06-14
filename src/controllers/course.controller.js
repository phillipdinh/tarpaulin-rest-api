const Course = require('../models/course.model');
const User = require("../models/user.model");
const Assignment = require('../models/assignment.model');
const userCourse = require('../models/userCourse.model');
/*
Course information fetching – this action, implemented by the GET /courses
and GET /courses/{id} endpoints, allows users to see information about all
Courses or about a specific Course.  Note that the information included by
both of these endpoints should not return information about a Course’s enrolled
students or its Assignments.  Instead, that information can be fetched by
the GET /courses/{id}/students and GET /courses/{id}/assignments endpoints, respectively.
 */
async function getAllCourses(req, res) {
    // This should enable the correct pagination as specified
    // "A few of the Tarpaulin API endpoints must be paginated:
    // GET /courses"
    try {
        // Parse limit and page from query parameters, defaulting to 10 items per page and the first page
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const offset = (page - 1) * limit;

        const courses = await Course.findAll({ limit, offset });
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createCourse(req, res) {
    // TODO: Add authentication and authorization middleware to protect this route.
    try {
        const course = await Course.create(req.body);
        res.status(201).json({ id: course.id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function getCourseById(req, res) {
    try {
        const course = await Course.findByPk(req.params.id);
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updateCourseById(req, res) {
    // TODO: Add authentication and authorization middleware to protect this route.
    try {
        // TODO: Validate incoming data
        const course = await Course.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(course);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function removeCourseById(req, res) {
    // TODO: Add authentication and authorization middleware to protect this route.
    try {
        await Course.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getStudentsByCourseId(req, res) {
    try {
        const courseId = req.params.id;
        const course = await Course.findByPk(courseId, {
            include: {
                model: User,
                as: 'users',
                attributes: User.UserClientFields, // Adjust the fields as per your requirements
                through: { attributes: [] }, // Exclude the UserCourse model from the response
            },
        });

        if (course) { // Getting an "unresolved variable users" warning here
            // But the warning "Unresolved variable users" might be coming up because the IDE
            // isn't aware of the dynamic properties added to the course object by Sequelize.
            // The users property is added by Sequelize when you include associated
            // User models in a query. It isn't statically defined anywhere hence improper
            // detection. Should work at runtime.
            res.status(200).json(course.users);
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updateEnrollmentByCourseId(req, res) {
    // TODO: Verify if the user is authenticated and has the necessary permissions

    const { add = [], remove = [] } = req.body;

    if (!Array.isArray(add) || !Array.isArray(remove)) {
        return res.status(400).json({ error: 'Invalid body. "add" and "remove" fields must be arrays.' });
    }

    const courseId = req.params.id;

    try {
        const course = await Course.findByPk(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Unenroll students
        for (const studentId of remove) {
            await userCourse.destroy({
                where: {
                    courseId,
                    userId: studentId
                }
            });
        }

        // Enroll students
        for (const studentId of add) {
            // Avoid duplicate entries
            const existingEnrollment = await UserCourse.findOne({
                where: {
                    courseId,
                    userId: studentId
                }
            });

            if (!existingEnrollment) {
                await userCourse.create({
                    courseId,
                    userId: studentId
                });
            }
        }

        return res.status(200).json({ success: 'Enrollment updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/*
Course roster download – this action, implemented by
the GET /courses/{id}/roster endpoint, allows certain authorized
 users to download a CSV-formatted roster for a specific course.
 The roster will contain a list of the students currently enrolled
  in the course, in CSV format, e.g.:

"abc123","Leia Organa","organal@oregonstate.edu"
"def456","Luke Skywalker","skywallu@oregonstate.edu"
...

Importantly, this file must be generated by the API, based on the list of enrolled students stored in the database.
 */
async function getRosterByCourseId(req, res) {
    try {
        const courseId = req.params.id;
        const course = await Course.findByPk(courseId, {
            include: {
                model: User,
                as: 'users',
                attributes: ['id', 'name', 'email'], // Adjust the fields as per your requirements
                through: { attributes: [] }, // Exclude the UserCourse model from the response
            },
        });

        if (course) {
            // Convert the user data to CSV
            const csvData = course.users.map(user => `"${user.id}","${user.name}","${user.email}"`).join('\n');
            res.status(200).send(csvData);
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAssignmentsByCourseId(req, res) {
    try {
        const courseId = req.params.id;
        const assignments = await Assignment.findAll({ where: { courseId } });
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = { getAllCourses, createCourse, getCourseById, updateCourseById, removeCourseById, getStudentsByCourseId, updateEnrollmentByCourseId, getRosterByCourseId, getAssignmentsByCourseId };