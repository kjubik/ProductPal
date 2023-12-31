import { db } from 'src/App';
import { ProductComment } from 'src/firebase/types/ProductComment';
import { collection, addDoc, query, getDocs, setDoc, orderBy, where, doc } from 'firebase/firestore';


export const createComment = async (comment: ProductComment) => {
    try {
        const commentsRef = collection(db, 'comments');
        alert('new comment created')
        await addDoc(commentsRef, comment);
    } catch (error) {
        console.log('Failed to create comment', error);
        throw error;
    }
}

export const getComments = async (productId: string): Promise<ProductComment[]> => {
    try {
        const commentsReference = collection(db, 'comments');
        const q = query(commentsReference, orderBy('creationDate', 'desc'), where('productId', '==', productId));
        const querySnapshot = await getDocs(q);
        const comments: ProductComment[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as ProductComment);
        return comments;
    } catch (error) {
        console.log('Failed to get comments', error);
        throw error;
    }
}

export const getUndeletedComments = async (productId: string): Promise<ProductComment[]> => {
    try {
        const commentsReference = collection(db, 'comments');
        const q = query(commentsReference, orderBy('creationDate', 'desc'), where('productId', '==', productId), where('isDeleted', '==', false));
        const querySnapshot = await getDocs(q);
        const comments: ProductComment[] = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as ProductComment);
        return comments;
    } catch (error) {
        console.log('Failed to get comments', error);
        throw error;
    }
}

export const updateComment = async (comment: ProductComment) => {
    try {
        if (!comment.id) throw new Error('Comment id is missing');
        const productReference = doc(db, "comments", comment.id);
        delete comment.id;
        await setDoc(productReference, comment, { merge: true });
    } catch (error) {
        console.log('Failed to put product', error);
        throw error;
    }
}

export const deleteComment = async (commentId: string) => {
    try {
        const commentReference = doc(db, "comments", commentId);
        await setDoc(commentReference, { isDeleted: true }, { merge: true });
    } catch (error) {
        console.log('Failed to delete comment', error);
        throw error;
    }
}
