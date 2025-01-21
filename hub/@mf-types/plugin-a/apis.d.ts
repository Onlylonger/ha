
    export type RemoteKeys = 'plugin-a/button';
    type PackageType<T> = T extends 'plugin-a/button' ? typeof import('plugin-a/button') :any;