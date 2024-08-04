"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface Tool {
  id: number;
  name: string;
  description: string;
  instruction: string;
  link: string;
  contact: string;
}

const DataTable = ({ userId }: { userId: string }) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tools?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const toolsData = await response.json();
        setTools(toolsData);
      } catch (error) {
        console.error('Error fetching tools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleRowClick = (id: number) => {
    router.push(`/tools/${id}`);
  };

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Instruction</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.map((tool) => (
            <TableRow key={tool.id} onClick={() => handleRowClick(tool.id)} className="cursor-pointer">
              <TableCell>{tool.id}</TableCell>
              <TableCell>{tool.name}</TableCell>
              <TableCell>{tool.description}</TableCell>
              <TableCell>{tool.instruction}</TableCell>
              <TableCell>
                <a href={tool.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  {tool.link}
                </a>
              </TableCell>
              <TableCell>{tool.contact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;