import './Card.css';
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, onSnapshot, setDoc, arrayUnion } from 'firebase/firestore';

function Card({ cardId, title, description }) {
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Função para curtir o card
  const handleLike = async () => {
    await setDoc(doc(db, 'Cards', cardId), { likes: likes + 1 }, { merge: true });
    setLikes(likes + 1);
  };

  // Função para atualizar o comentário no estado
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Função para adicionar o comentário e curtir o card
  const handleAddComment = async () => {
    if (comment.trim() === '') return; // Verifica se o comentário não está vazio

    const newComment = { text: comment, likes: 0 };
    const updatedComments = [...comments, newComment];
    
    setComments(updatedComments);
    setComment('');  // Limpa o campo de texto após adicionar o comentário

    // Verifique se os dados do comentário estão corretamente definidos
    await setDoc(doc(db, 'Cards', cardId), {
      comments: arrayUnion(newComment)  // Adiciona o novo comentário ao Firestore
    }, { merge: true });
  };

  // Função para curtir um comentário específico
  const handleCommentLike = async (index) => {
    const updatedComments = [...comments];
    updatedComments[index].likes += 1;
    setComments(updatedComments);

    // Atualiza no Firestore
    await setDoc(doc(db, 'Cards', cardId), {
      comments: updatedComments.map((comment) => ({
        text: comment.text,
        likes: comment.likes
      }))
    }, { merge: true });
  };

  // Recuperando os dados do card do Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'Cards', cardId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setLikes(data.likes || 0);
        setComments(data.comments || []);
      } else {
        console.log(`Documento ${cardId} não encontrado, será criado ao interagir.`);
      }
    });
    return () => unsubscribe();
  }, [cardId]);

  return (
    <div className="Card">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={handleLike}>Curtir ({likes})</button>
      <h3>Comentários:</h3>
      {comments.map((c, index) => (
        <div key={index} className="comment">
          <p>{c.text}</p>
          <button onClick={() => handleCommentLike(index)}>Curtir Comentário ({c.likes})</button>
        </div>
      ))}
      <input
        type="text"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Digite seu comentário"
      />
      <button onClick={handleAddComment}>Adicionar Comentário</button>
    </div>
  );
}

export default Card;


