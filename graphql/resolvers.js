const User = require('../model/User');
const Patient = require('../model/Patient');
const Specialty = require('../model/Specialty');
const Appointment = require('../model/Appointment');
const {createToken, hashPassword, isAuthenticated } = require('./auth');
const bcrypt = require('bcryptjs');
require('dotenv').config({path: 'variables.env'});

const resolvers = {
    Query: {
        me: async (_, __, context) => {
            const userToken = isAuthenticated(context);

            try{
                const user = await User.findById(userToken.id);
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            }
            catch (error) {
                console.error('Error fetching user:', error);
                throw new Error('Error fetching user data');
            }
        },

        getPatients: async (_, __, context) => {
            isAuthenticated(context);
            try {
                return await Patient.find({});
            } catch (error) {
                console.error('Error fetching patients:', error);
                throw new Error('Error fetching patients');
            }
        },

        getPatient: async (_, {id}, context) => {
            isAuthenticated(context);
            try{
                const patient = await Patient.findById(id);
                if (!patient) {
                    throw new Error('Patient not found');
                }

                return patient;
            }
            catch (error) {
                console.error('Error fetching patient:', error);
                throw new Error('Error fetching patient data');
            }
        },

        getSpecialties: async (_, __, context) => {
            isAuthenticated(context);
            try {
                return await Specialty.find({});
            } catch (error) {
                console.error('Error fetching specialties:', error);
                throw new Error('Error fetching specialties');
            }
        },

        getAppointments: async (_, __, context) => {
            isAuthenticated(context);
            try {
                return await Appointment.find({})
                    .populate('patient')
                    .populate('specialty');
            } catch (error) {
                console.error('Error fetching appointments:', error);
                throw new Error('Error fetching appointments');
            }
        },

        getAppointmentsByPatient: async (_, {patientId}, context) => {
            isAuthenticated(context);
            try {
                const patientExists = await Patient.findById(patientId);
                if (!patientExists) {
                    throw new Error('Patient not found');
                }

                return await Appointment.find({ patient: patientId })
                    .populate('patient')
                    .populate('specialty');
            } catch (error) {
                console.error('Error fetching appointments by patient:', error);
                throw new Error('Error fetching appointments by patient');
            }
        }
    },
    Mutation:{
        registerUser: async (_, {input}) => {
            const { name, email, password } = input;
            const userExists = await User.findOne({ email });

            if (userExists) {
                throw new Error('User already exists with this email');
            }

            try {
                const hashedPassword = await hashPassword(password);
                
                const user = new User({
                    name,
                    email,
                    password: hashedPassword
                });

                return await user.save();
            }
            catch (error) {
                console.log(error);
                throw new Error('Error saving user to database');
            }
        },

        login: async(_, {input}) => {
            const { email, password } = input;
            const user = await User.findOne({email});

            if (!user) {
                throw new Error('User not found with this email');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Incorrect password');
            }

            return {
                token: createToken(user, process.env.SECRET, '24h')
            };

        },

        createPatient: async(_, {input}, context) => {
            isAuthenticated(context);
            const { name, dni, phone } = input;

            try {

                const existingPatient = await Patient.findOne({ dni });
                if (existingPatient) {
                    throw new Error('Patient already exists with this DNI');
                }

                const patient = new Patient({
                    name,
                    dni,
                    phone,
                });

                return await patient.save();
            }
            catch (error) {
                console.error('Error creating patient:', error);
                throw new Error('Error creating patient');
            }
        },

        createSpecialty: async(_, {input}, context) => {
            isAuthenticated(context);
            const { name } = input;

            try {

                const existingSpecialty = await Specialty.findOne({ name });
                if (existingSpecialty) {
                    throw new Error('Specialty already exists with this name');
                }

                const specialty = new Specialty({
                    name,
                });

                return await specialty.save();
            }
            catch (error) {
                console.error('Error creating specialty:', error);
                throw new Error('Error creating specialty');
            }
        },

        createAppointment: async (_, {input}, context) =>{
            isAuthenticated(context);

            const { patientId, specialtyId, date } = input;

            const patientExists = await Patient.findById(patientId);
            if (!patientExists) {
                throw new Error('Patient not found');
            }

            const specialtyExists = await Specialty.findById(specialtyId);
            if (!specialtyExists) {
                throw new Error('Specialty not found');
            }

            const appointment = new Appointment({
                patient: patientId,
                specialty: specialtyId,
                date,
            });

            try {
                const savedAppointment = await appointment.save();
                return await Appointment.findById(savedAppointment._id)
                    .populate('patient')
                    .populate('specialty');

            } catch (error) {
                console.error('Error creating appointment:', error);
                throw new Error('Error creating appointment');
            }
        }
    }
};

module.exports = resolvers;