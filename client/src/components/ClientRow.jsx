import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations.jsx';
import { GET_CLIENTS } from '../queries/clientQueries';
// import { GET_PROJECTS } from '../queries/projectQueries';

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    

    //Problem - whenever we delete client , we have to refresh our UI to see the changes. Now to solve that we have to 2 methods
    //1: Call another query called GET_CLIENTS
    // refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],

    //2: Update the cache
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}