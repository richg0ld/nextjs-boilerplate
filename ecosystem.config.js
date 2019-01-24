module.exports = {
  apps : [{
    name: 'next',
    script: '.next/production-server/index.js',
    exec_mode: 'cluster',
    instances: 0, //0으로 지정 할 경우 cpu코어 수 만큼 인스턴스 생성
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }],
};
