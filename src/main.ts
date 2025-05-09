import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs'; // Add this import

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
