/* eslint valid-jsdoc: "off" */

'use strict';

const { INSECURE_DEFAULT_JWT_SECRET } = require('./constants');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = exports = {};
  config.keys = appInfo.name + '_1667378056410_2465';

  // 中间件列表
  config.middleware = [ 'errorHandler' ];
  // 错误处理中间件
  config.errorHandler = {
    match: '/api'
  };

  const userConfig = {
    // 房东端小程序配置
    landlordMP: {
      appid: '',
      secret: ''
    },
    // 租客端小程序配置
    tenantsMP: {
      appid: '',
      secret: ''
    },
    // 上传文件目录
    uploadDir: 'app/public/upload',
    // oss配置minio
    minio: {
      endPoint: 'localhost', // 连接地址
      port: 9000, // 端口
      useSSL: false, // 不需要https
      accessKey: 'right_house_minio',
      secretKey: 'right_house_minio_980128',
      urldomain: '', // 域名
      bucketName: 'filebucket' // 桶名称
    },
    // 房间报修阿里云短信通知
    houseMaintenanceMessage: {
      SignName: '',
      TemplateCode: ''
    },
    // 房间维修完毕阿里云短信通知
    houseSolveMaintenanceMessage: {
      SignName: '',
      TemplateCode: ''
    },
    // 房间入住阿里云短信通知
    houseJoinTenantMessage: {
      SignName: '',
      TemplateCode: ''
    },
    // 房间退租给租客的阿里云短信通知
    houseOutTenantMessage: {
      SignName: '',
      TemplateCode: ''
    },
    // 房间退租给房东的阿里云短信通知
    houseOutLandlordMessage: {
      SignName: '',
      TemplateCode: ''
    },
    // 租客申请租赁的阿里云短信通知
    tenantLeaseApplicationMessage: {
      SignName: '',
      TemplateCode: ''
    },
    // 房东通过租赁的阿里云短信通知
    passLeaseApplicationMessage: {
      SignName: '',
      TemplateCode: ''
    },
    // 房东驳回租客租赁的阿里云短信通知
    nopassLeaseApplicationMessage: {
      SignName: '',
      TemplateCode: ''
    }
  };
  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    timezone: '+08:00',
    database: 'right_house_db',
    username: 'root',
    password: 'right_house_sql_980128'
  };
  // redis配置
  config.redis = {
    client: {
      port: 6379,
      host: 'localhost',
      password: 'right_house_redis_980128',
      db: 0
    }
  };
  // security
  config.security = {
    csrf: {
      enable: false
    }
  };
  // jwt（生产环境请通过环境变量 JWT_SECRET 设置强随机密钥）
  const jwtSecret = process.env.JWT_SECRET || INSECURE_DEFAULT_JWT_SECRET;
  const usingInsecureJwtSecret = !process.env.JWT_SECRET || jwtSecret === INSECURE_DEFAULT_JWT_SECRET;
  if (usingInsecureJwtSecret) {
    // eslint-disable-next-line no-console
    console.warn([
      '========== SECURITY WARNING ==========',
      'JWT secret is using the default/insecure value.',
      'Anyone with access to this open-source project can forge authentication tokens.',
      'Set the JWT_SECRET environment variable to a strong random secret before deploying.',
      'Example: JWT_SECRET=<your-random-secret> npm start',
      '======================================'
    ].join('\n'));
    if (process.env.EGG_SERVER_ENV === 'prod') {
      throw new Error(
        'Refusing to start in production with insecure default JWT secret. Set JWT_SECRET environment variable.'
      );
    }
  }
  config.jwt = {
    secret: jwtSecret,
    sign: {
      expiresIn: 604800 // 过期时间
    }
  };
  // multipart
  config.multipart = {
    mode: 'file'
  };
  // 默认配置
  config.cluster = {
    listen: {
      port: 7001
    }
  };
  // 性能监控平台配置
  // config.alinode = {
  //   server: '',
  //   appid: '',
  //   secret: ''
  // };
  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // 短信服务配置
  config.sms = {
    client: {
      accessKeyId: 'accessKeyId',
      secretAccessKey: 'secretAccessKey'
    }
  };
  return {
    ...config,
    ...userConfig
  };
};
