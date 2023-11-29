export interface ITableData {
    data: ITableDataData[];
}

export interface ITableDataData {
    user: string;
    email: string;
    admin: boolean;
}