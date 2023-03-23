import {BootstrapConsole} from 'nestjs-console';
import {GenerateModule} from './common';

const moduleMappers = {
  client: GenerateModule,
}

const actions = Object.keys(moduleMappers);

const action = process.argv.filter(arg => actions.includes(arg))[0];

if(!action) throw new Error(`Can't find script generate ${action}. Currently support scripts ${actions}`)

const bootstrap = new BootstrapConsole({
  module: moduleMappers[action],
  useDecorators: true,
});

bootstrap.init().then(async (app) => {
  try {
    await app.init();
    await bootstrap.boot();
    await app.close();
  } catch (e) {
    console.error(e);
    await app.close();
    process.exit(1);
  }
});
