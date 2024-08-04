import DataTable from "./_components/data-table";
import { auth } from "@clerk/nextjs/server";

const ToolsPage = () => {
  const { userId } = auth();

  console.log(userId);

  return (
      <DataTable userId={userId ?? ""} />
  );
};

export default ToolsPage;
