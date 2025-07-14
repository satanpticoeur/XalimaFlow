import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext'; // Si vous avez un AuthContext
import { useNavigate, useParams } from 'react-router-dom'; // <--- NOUVEAU: useParams
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import contentService from '../services/contentService'; // <--- Importez ContentResponse
import ContentEditor from '@/components/ContentEditor';

const Dashboard: React.FC = () => {
  // const { user } = useAuth(); // Si vous utilisez un contexte d'authentification
  const navigate = useNavigate();
  const { contentId } = useParams<{ contentId: string }>(); // <--- Récupère l'ID depuis l'URL

  const [editorContent, setEditorContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [editingContentId, setEditingContentId] = useState<number | null>(null); // <--- Pour savoir si on édite


  // Effet pour charger le contenu si contentId est dans l'URL
  useEffect(() => {
    if (contentId) {
      const id = parseInt(contentId);
      if (!isNaN(id)) {
        setEditingContentId(id);
        const fetchContent = async () => {
          try {
            const response = await contentService.getContentById(id);
            setTitle(response.data.title);
            setEditorContent(response.data.content_html || response.data.content_markdown || '');
            // Vous pouvez aussi définir le statut si vous avez un sélecteur de statut
          } catch (error: any) {
            toast.error('Content not found',{
              description: error.response?.data?.detail || 'The content you are trying to edit does not exist.',
            });
            navigate('/dashboard'); // Redirige si le contenu n'est pas trouvé ou erreur
          }
        };
        fetchContent();
      } else {
        navigate('/dashboard'); // Redirige si l'ID n'est pas un nombre
      }
    } else {
      // Si aucun ID, assurez-vous de réinitialiser pour un nouveau contenu
      setEditingContentId(null);
      setTitle('');
      setEditorContent('');
    }
  }, [contentId, navigate]);


  const handleSaveContent = async () => {
    setIsSaving(true);
    try {
      const payload = {
        title: title,
        content_html: editorContent,
        status: 'draft', // Ou 'published' etc., selon votre logique
      };

      if (editingContentId) {
        // MISE À JOUR: Si editingContentId est défini, on met à jour
        await contentService.updateContent(editingContentId, payload);
        toast.success('Content updated successfully!', {
          description: 'Your content has been updated.',
        });
        navigate(`/dashboard/${editingContentId}`); // Redirige vers l'édition du
      } else {
        // CRÉATION: Sinon, on crée un nouveau contenu
        const response = await contentService.createContent(payload);
        toast.success('Content created successfully!', {
          description: 'Your new content has been created.',
        });
        setTitle(''); // Réinitialise le titre
        setEditorContent(''); // Réinitialise le contenu de l'éditeur
        // Si la création est réussie, on peut rediriger vers l'édition de ce nouveau contenu
        navigate(`/dashboard/${response.data.id}`);
        setEditingContentId(response.data.id); // Met à jour l'ID d'édition
      }
    } catch (error: any) {
      toast.error('Failed to save content.', {
        description: error.response?.data?.detail || 'An error occurred while saving your content.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateAiText = async () => {
    // ... (Votre code pour la génération d'IA reste le même) ...
    if (!aiPrompt) {
      toast.error('Please enter a prompt for AI generation.',{
        description: 'The AI needs a prompt to generate content.',
      });
      return;
    }
    setIsGenerating(true);
    try {
      const response = await contentService.generateAiText({ prompt: aiPrompt });
      const generatedPlainText = response.data;

      const generatedHtml = generatedPlainText
        .split('\n\n')
        .map(paragraph => `<p>${paragraph.trim()}</p>`)
        .join('');

      setEditorContent(prevContent => {
        const separator = prevContent.trim() ? '<p>&nbsp;</p>' : '';
        return prevContent + separator + generatedHtml;
      });

      toast.success('AI text generated successfully!', {
        description: 'The AI has generated content based on your prompt.',
      });
    } catch (error: any) {
      toast.error('Failed to generate AI text.', {
        description: error.response?.data?.detail || 'An error occurred while generating AI text.',
      });
    } finally {
      setIsGenerating(false);
      setAiPrompt('');
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        {editingContentId ? 'Edit Content' : 'New Content'}
      </h1>

      <div className="mb-4">
        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter content title"
          className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <Label className="block text-sm font-medium text-gray-700 mb-2">Content</Label>
        <ContentEditor
          initialValue={editorContent}
          onEditorChange={(content, editor) => setEditorContent(content)}
        />
      </div>

      <div className="mb-6 flex space-x-2">
        <Button onClick={handleSaveContent} disabled={isSaving || !title.trim()}>
          {isSaving ? 'Saving...' : 'Save Content'}
        </Button>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          {editingContentId ? 'Back to New Content' : 'New Content'}
        </Button>
      </div>

      <div className="mb-4">
        <Label htmlFor="ai-prompt" className="block text-sm font-medium text-gray-700">Generate with AI</Label>
        <div className="flex space-x-2 mt-1">
          <Input
            id="ai-prompt"
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="E.g., 'Write an article about secure JWT authentication'"
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <Button onClick={handleGenerateAiText} disabled={isGenerating || !aiPrompt.trim()}>
            {isGenerating ? 'Generating...' : 'Generate AI Text'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;