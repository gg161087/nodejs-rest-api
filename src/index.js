import app from './app';

const main = () => {
    app.listen(app.get('port'));
    console.log(`Server running http://127.0.0.1:${app.get('port')}`);
};

main();