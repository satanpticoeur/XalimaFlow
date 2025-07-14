import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import contentService, { type ContentResponse } from '../services/contentService'; // Importez ContentResponse

const ContentList: React.FC = () => {
  const [contents, setContents] = useState<ContentResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await contentService.getUserContents();
        setContents(response.data);
      } catch (error: any) {
        toast.error(error.response?.data?.detail || 'Failed to load contents.', {
          description: 'Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchContents();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/dashboard/${id}`); // Navigue vers la page d'édition
  };


  if (isLoading) {
    return <div className="container mx-auto p-4">Loading contents...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Contents</h1>
      <Button onClick={() => navigate('/dashboard')} className="mb-4">Create New Content</Button>
      {contents.length === 0 ? (
        <p>You haven't created any content yet. Go to Dashboard to start!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contents.map((content) => (
            <div key={content.id} className="border p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{content.title}</h2>
              <p className="text-gray-600 text-sm mb-2">Status: {content.status}</p>
              <p className="text-gray-500 text-xs">Last updated: {new Date(content.updated_at).toLocaleDateString()}</p>
              <div className="mt-4 flex space-x-2">
                <Button size="sm" onClick={() => handleEdit(content.id)}>Edit</Button>
                {/* <Button size="sm" variant="destructive" onClick={() => handleDelete(content.id)}>Delete</Button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentList;