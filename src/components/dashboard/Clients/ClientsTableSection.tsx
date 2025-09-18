// server component (async)
import UserActionsMenu from "@/components/dashboard/Clients/ClientActionsMenu";
import Table from "@/components/shared/Table";
import { columns, rows } from "@/constants/dashboard/users";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function ClientsTableSection({ searchParams }: { searchParams?: SearchParams }) {

    await new Promise((r) => setTimeout(r, 700));

    return <Table columns={columns} rows={rows} showActions actionsMenu={<UserActionsMenu />} />;
}
