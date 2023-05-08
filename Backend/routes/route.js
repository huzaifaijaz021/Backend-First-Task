import express from 'express';
const router = express.Router();
import userInfo from '../models/user-details.js';


router.get('/', function (req, res, next) {
    console.log("Router Working");
    res.end();
})

//for get/show  the data from the database
router.get('/showdata', async (req, res) => {
    try {
        const data = await userInfo.find();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error); // Failure
        return res.status(500).json(error);
    }
});


//Send Data from Frontend to Backend
router.post('/insert', async (req, res) => {

    try {
        const { name, username, email: Email, address, phone, website, company } = req.body;

        const existingUsers = await userInfo.findOne({ email: Email });
        if (existingUsers) {
            await userInfo.updateOne({ email: Email }, {
                name,
                username,
                address,
                phone,
                website,
                company
            });
            console.log("Frontend data Updated");
            return res.status(200).json("Frontend Data Updated");

        }
        else {
            const { name, username, email, address, phone, website, company } = req.body;
            const formData = await userInfo.create({
                name,
                username,
                email,
                address,
                phone,
                website,
                company
            })
            // const hello = await formData.save();
            console.log("Frontend Data Created");
            return res.status(200).json("Frontend Data Created");
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
})


// Delete the User from Frontend
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // const deletedData = await userInfo.findByIdAndDelete(id);
        const deletedData = await userInfo.deleteOne({ _id: id });

        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json({ id, message: 'Data deleted successfully' });
        console.log("Data Deleted Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


//new Update the data from Frontend
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body
    console.log("🚀 ~ file: route.js:158 ~ router.put ~ req.body:", req.body)
    try {
        const updatedData = await userInfo.updateOne({ _id: id }, updateData);
        // const updateData = await userInfo.findByIdAndUpdate(id, values);
        if (!updatedData) {
            return res.status(404).json({ message: 'Data not updated' });
        }
        res.json({ id, message: 'Data updated successfully' });
        console.log('Data updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


//Insert data (2)
router.post('/insertpost', async (req, res) => {

    console.log("🚀 ~ file: route.js:121 ~  router.post ~ req.body:", req.body)
    try {
        const { name, email: Email, age, gender } = req.body;

        const existingUsers = await userInfo.findOne({ email: Email });
        if (existingUsers) {
            await userInfo.updateOne({ email: Email }, {
                name,
                age,
                gender

            });
            console.log("Frontend data Updated");
            return res.status(200).json("Frontend Data Updated");

        }
        else {
            const { name, email, age, gender } = req.body;
            const formData = await userInfo.create({
                name,
                email,
                age,
                gender
            })

            // const hello = await formData.save();
            console.log("Frontend Data Created");
            return res.status(200).json("Frontend Data Created");
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
})

//show data (2)
router.get('/showdata/:id', async (req, res) => {
    const { id } = req.params
    try {
        const data = await userInfo.findById(id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error); // Failure
        return res.status(500).json(error);
    }
});
//Update the User (2)
router.put('/showdata/:id', async (req, res) => {
    const values = req.body
    // console.log({ values: req.body })
    try {
        const { id } = req.params;
        const updateData = await userInfo.updateOne({ _id: id }, values);
        // const updateData = await userInfo.findByIdAndUpdate(id, values);

        console.log("🚀 ~ file: route.js:116 ~ router.put ~ updateData:", updateData)

        if (!updateData) {
            return res.status(404).json({ message: 'Data not updated' });
        }
        res.json({ id, message: 'Data updated successfully' });
        console.log('Data updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
export default router;

