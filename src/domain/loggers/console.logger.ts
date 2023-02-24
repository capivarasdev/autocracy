import { Logger } from './logger';

function okMessage(From: string, Message: string): string {
    return `[\x1b[36m${new Date().toLocaleTimeString()}\x1b[0m][\x1b[32m${From}\x1b[0m] \x1b[37m${Message}\x1b[0m`;
}
function warnMessage(From: string, Message: string): string {
    return `[\x1b[36m${new Date().toLocaleTimeString()}\x1b[0m][\x1b[33m${From}\x1b[0m] \x1b[37m${Message}\x1b[0m`;
}
function infoMessage(From: string, Message: string): string {
    return `[\x1b[36m${new Date().toLocaleTimeString()}\x1b[0m][\x1b[34m${From}\x1b[0m] \x1b[37m${Message}\x1b[0m`;
}
function errMessage(From: string, Message: string): string {
    return `[\x1b[36m${new Date().toLocaleTimeString()}\x1b[0m][\x1b[31m\x1b[1m${From}\x1b[0m] ${Message}\x1b[0m`;
}

export class consoleLogger implements Logger {
    private static readonly successHolder: string = 'OK';
    private static readonly errorHolder: string = 'ERROR';
    private static readonly warningHolder: string = 'WARN';
    private static readonly infoHolder: string = 'INFO';

    success(message: string): void {
        console.log(okMessage(consoleLogger.successHolder, message));
    }
    warning(message: string): void {
        console.warn(warnMessage(consoleLogger.warningHolder, message));
    }
    info(message: string): void {
        console.info(infoMessage(consoleLogger.infoHolder, message));
    }
    error(message: string): void {
        console.error(errMessage(consoleLogger.errorHolder, message));
    }
}
