import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../config/instance";


export default function TableProduct({ props }) {
  const { i, product, fetchProduct } = props; //Menerima props dari Parent
  const navigate = useNavigate();

  const handlerEdit = async (type) => { //function diberi parameter type
    if(product.authorId !== localStorage.id_user && localStorage.role !== 'admin'){
        Swal.fire("403",`Only admin or author with same id can access this feature`,"warning")
        return navigate("/")
    }
    
    navigate(type ==="edit" ? `/products/${product.id}` : `/products/upload/${product.id}`)
  }

  //ngirim id (namanya bebas) barang untuk di delete
  const handlerDelete = async (id) => {
    try {
        const result = await Swal.fire({
            title:"Yakinnn nih mau delete",
            text:"Ga bisa dibalikkin lagi lho",
            icon:"warning",
            showCancelButton:true,
            confirmButtonColor:"#3085d6",
            cancelButtonColor:"#d33",
            confirmButtonText:"Yes, delete it!"
        });
        // Saat barang yang mau di delete di klik, dia baru nyari id yg dikirim dari client ke server untuk dihapus
        if(result.isConfirmed){
            const {data} = await axios({
                method: "delete",
                url: `/products/${id}`,
                headers: {
                    authorization: `Bearer ${localStorage.access_token}`
                }
            });
            //setelah menampilkan pesan item di delete, Ngefetch ulang yang diterima dari props
            Swal.fire({
                title:"Data has been deleted",
                text: `${data.message}`,
                icon: "success"
            });
            setTimeout(() => {
                fetchProduct()
            },1000)
        }
    } catch (error) {
      // error saat ngeaxios akan diterima dalam response.data.message
        let errors = error.response.data.message
        Swal.fire({
            icon: "error",
            title: "Gagallllllll",
            text:errors
        })
    }
  }

  return (
    <>
      <tr>
        <th scope="row">{i+1}</th>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
        <td>{product.stock}</td>
        <td><img style={{height:"100px", width:"100px", objectFit:"cover"}} src={product.imgUrl}/></td>
        <td>{product.categoryId}</td> 
        <td>{product.User.username}</td>
        <td>
            <button className="btn btn-primary" onClick={() => {handlerEdit()}}>Upload Image</button>
            <button className="btn btn-success" onClick={() => {handlerEdit("edit")}} >Edit</button>
            <button className= "btn btn-danger" onClick={() => {handlerDelete(product.id)}}>Delete</button>
        </td>
      </tr>
    </>
  );
}
