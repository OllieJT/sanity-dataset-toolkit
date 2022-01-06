declare type HandleError = (err: Error) => void;
declare type HandleCompletion = (...data: any[]) => void;
declare type HandleData<Data> = (data: Data) => void;
