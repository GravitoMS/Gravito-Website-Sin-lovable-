import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, X, Save } from 'lucide-react'

interface BlogPost {
  id?: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image?: string
  status?: string
  published_at?: string
  created_at?: string
  updated_at?: string
  created_by?: string
  updated_by?: string
}

export const SimpleBlogCMS: React.FC = () => {
  const { isAdmin } = useAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    status: 'draft'
  })

  // Cargar posts
  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error cargando posts:', error)
    } finally {
      setLoading(false)
    }
  }

  // Crear nuevo post
  const createPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([formData])
        .select()
        .single()

      if (error) throw error
      
      setPosts(prev => [data, ...prev])
      resetForm()
      setShowForm(false)
    } catch (error) {
      console.error('Error creando post:', error)
    }
  }

  // Actualizar post
  const updatePost = async () => {
    if (!editingPost?.id) return

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(formData)
        .eq('id', editingPost.id)
        .select()
        .single()

      if (error) throw error
      
      setPosts(prev => prev.map(post => 
        post.id === editingPost.id ? data : post
      ))
      resetForm()
      setEditingPost(null)
    } catch (error) {
      console.error('Error actualizando post:', error)
    }
  }

  // Eliminar post
  const deletePost = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este post?')) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setPosts(prev => prev.filter(post => post.id !== id))
    } catch (error) {
      console.error('Error eliminando post:', error)
    }
  }

  // Iniciar edición
  const startEditing = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      featured_image: post.featured_image || '',
      status: post.status || 'draft'
    })
  }

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      featured_image: '',
      status: 'draft'
    })
  }

  // Manejar cambios en el formulario
  const handleInputChange = (field: keyof BlogPost, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Cargar posts al montar
  useEffect(() => {
    loadPosts()
  }, [])

  // Solo mostrar si es admin
  if (!isAdmin) {
    return null
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">Cargando posts...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">CMS de Blog</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nuevo Post
        </button>
      </div>

      {/* Formulario */}
      {(showForm || editingPost) && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingPost ? 'Editar Post' : 'Nuevo Post'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingPost(null)
                resetForm()
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Título del post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Extracto</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                placeholder="Breve descripción del post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contenido</label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={6}
                placeholder="Contenido completo del post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Slug (URL amigable)</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="mi-post-url-amigable"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">URL de Imagen (opcional)</label>
              <input
                type="url"
                value={formData.featured_image}
                onChange={(e) => handleInputChange('featured_image', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Estado</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={editingPost ? updatePost : createPost}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingPost ? 'Actualizar' : 'Crear'}
              </button>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingPost(null)
                  resetForm()
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Posts */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay posts aún. ¡Crea el primero!
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-2">{post.excerpt}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.created_at || '').toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(post)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deletePost(post.id!)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {post.featured_image && (
                <img 
                  src={post.featured_image} 
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
