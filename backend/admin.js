import express from 'express';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import sequelize from './config/database.js';
import User from './models/User.js';
import dotenv from 'dotenv';
import SportRegistration from './models/sports.js';

dotenv.config();
console.log('Admin email:', process.env.ADMIN_EMAIL);
console.log('Cookie secret:', process.env.COOKIE_SECRET);
console.log('Session secret:', process.env.SESSION_SECRET);

AdminJS.registerAdapter(AdminJSSequelize);

// Create AdminJS options
const adminOptions = {
  databases: [sequelize],
  rootPath: '/admin',
  loginPath: '/admin/login',
  logoutPath: '/admin/logout',
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: {
            isVisible: { list: false, filter: false, show: true, edit: true },
          },
          encryptedPassword: {
            type: 'string',
            isVisible: { list: false, edit: true, filter: false, show: true },
          },
          points: {
            type: 'number',
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
        },
      },
    },
    {
      resource: SportRegistration,
      options: {
        properties: {
          id: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          sport: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          captainFirstName: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          captainLastName: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          captainEmail: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          captainContactNumber: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          viceCaptainFirstName: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          viceCaptainLastName: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          viceCaptainEmail: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          viceCaptainContactNumber: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          teamMembers: {
            type: 'mixed',
            isVisible: { list: true, filter: true, show: true, edit: true },
            components: {
              show: {
                render: (props) => {
                  // Return HTML string for the formatted JSON
                  return `<pre>${JSON.stringify(props.record.params.teamMembers, null, 2)}</pre>`;
                },
              },
              edit: {
                render: (props) => {
                  const teamMembers = JSON.stringify(props.record.params.teamMembers, null, 2);
                  return `<textarea style="width: 100%; height: 200px;">${teamMembers}</textarea>`;
                },
              },
            },
          },
          userId: {
            reference: 'Users',
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
        },
      },
    },
  ],
};

const adminJs = new AdminJS(adminOptions);
const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      return { email: process.env.ADMIN_EMAIL };
    }
    return null;
  },
  cookiePassword: process.env.COOKIE_SECRET,
});

export { adminJs, router };
