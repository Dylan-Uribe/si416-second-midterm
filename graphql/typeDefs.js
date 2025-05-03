const {gql} = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        createdAt: String
    }

    type Patient {
        id: ID!
        name: String!
        dni: String!
        phone: String
        appointments: [Appointment]
        createdAt: String
    }

    type Specialty {
        id: ID!
        name: String!
        createdAt: String
    }

    type Appointment {
        id: ID!
        patient: Patient!
        specialty: Specialty!
        date: String!
        createdAt: String
    }

    type Token {
        token: String!
    }

    # Input for user registration
    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    # Input for authentication
    input AuthInput {
        email: String!
        password: String!
    }

    # Input for patient creation
    input PatientInput {
        name: String!
        dni: String!
        phone: String
    }

    # Input for specialty creation
    input SpecialtyInput {
        name: String!
    }

    # Input for appointment creation
    input AppointmentInput {
        patientId: ID!
        specialtyId: ID!
        date: String!
    }

    # Queries
    type Query {
        # Users
        me: User

        # Patients
        getPatients: [Patient]
        getPatient(id: ID!): Patient

        # Appointments
        getAppointments: [Appointment]
        getAppointmentsByPatient(patientId: ID!): [Appointment]

        # Specialties
        getSpecialties: [Specialty]
    }

    # Mutations
    type Mutation {
        # Users
        registerUser(input: UserInput!): User
        login(input: AuthInput!): Token

        # Patients
        createPatient(input: PatientInput!): Patient

        # Specialties
        createSpecialty(input: SpecialtyInput!): Specialty

        # Appointments
        createAppointment(input: AppointmentInput!): Appointment
    }
`;

module.exports = typeDefs;