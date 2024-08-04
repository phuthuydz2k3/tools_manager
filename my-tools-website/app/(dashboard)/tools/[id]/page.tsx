"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Tool {
  id: number;
  name: string;
  description: string;
  instruction: string;
  link: string;
  contact: string;
}

const ToolDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tools/${id}`);
        setTool(response.data);
      } catch (error) {
        console.error('Error fetching tool:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/tools/${id}`, tool);
      alert('Tool updated successfully');
      router.push('/tools');
    } catch (error) {
      console.error('Error updating tool:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/tools/${id}`);
      alert('Tool deleted successfully');
      router.push('/tools');
    } catch (error) {
      console.error('Error deleting tool:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tool Detail</h1>
      <div className="space-y-4">
        <div>
          <label>Name</label>
          <Input
            value={tool.name}
            onChange={(e) => setTool({ ...tool, name: e.target.value })}
          />
        </div>
        <div>
          <label>Description</label>
          <Input
            value={tool.description}
            onChange={(e) => setTool({ ...tool, description: e.target.value })}
          />
        </div>
        <div>
          <label>Instruction</label>
          <Input
            value={tool.instruction}
            onChange={(e) => setTool({ ...tool, instruction: e.target.value })}
          />
        </div>
        <div>
          <label>Link</label>
          <Input
            value={tool.link}
            onChange={(e) => setTool({ ...tool, link: e.target.value })}
          />
        </div>
        <div>
          <label>Contact</label>
          <Input
            value={tool.contact}
            onChange={(e) => setTool({ ...tool, contact: e.target.value })}
          />
        </div>
        <div className="flex space-x-4">
          <Button onClick={handleUpdate}>Update</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default ToolDetailPage;