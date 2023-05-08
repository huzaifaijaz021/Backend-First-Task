import Agenda from 'agenda';

const { DATABASE_URL } = process.env;
const agenda = new Agenda({
    db: { address: DATABASE_URL, collection: 'UserDetails' },
});

export default agenda;