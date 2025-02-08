"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const morgan = require("morgan");
const path_1 = require("path");
const bodyParser = require("body-parser");
const exception_filter_1 = require("./utils/filters/exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new exception_filter_1.GlobalExceptionFilter());
    app.setGlobalPrefix('api');
    app.use(morgan('dev'));
    app.enableCors();
    app.use(bodyParser.text());
    app.use(bodyParser.json({ limit: '2mb' }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    const reactjsFolder = '../../transpaservic-dist/frontend';
    app.useStaticAssets((0, path_1.join)(__dirname, reactjsFolder), {
        prefix: '/',
    });
    app
        .getHttpAdapter()
        .getInstance()
        .all('*', (req, res, next) => {
        if (!req.url.startsWith('/api')) {
            res.sendFile((0, path_1.join)(__dirname, reactjsFolder, 'index.html'));
        }
        else {
            next();
        }
    });
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    common_1.Logger.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map