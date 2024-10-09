declare const fs: any;
declare const _: any;
declare const acorn: any;
declare const walk: any;
declare function parseBundle(bundlePath: any): {
    modules: any;
    src: any;
    runtimeSrc: string;
};
/**
 * Returns bundle source except modules
 */
declare function getBundleRuntime(content: any, modulesLocations: any): string;
declare function isIIFE(node: any): boolean;
declare function getIIFECallExpression(node: any): any;
declare function isModulesList(node: any): any;
declare function isSimpleModulesList(node: any): any;
declare function isModulesHash(node: any): any;
declare function isModulesArray(node: any): any;
declare function isOptimizedModulesArray(node: any): any;
declare function isModuleWrapper(node: any): boolean;
declare function isModuleId(node: any): boolean;
declare function isNumericId(node: any): boolean;
declare function isChunkIds(node: any): any;
declare function isAsyncChunkPushExpression(node: any): any;
declare function mayBeAsyncChunkArguments(args: any): any;
declare function isAsyncWebWorkerChunkExpression(node: any): any;
declare function getModulesLocations(node: any): any;
declare function getModuleLocation(node: any): {
    start: any;
    end: any;
};
