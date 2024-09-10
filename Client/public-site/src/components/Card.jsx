import {Link} from "react-router-dom"

export default function Card({ product }) {
  return (
    <div className="col-3 mb-4">
      <div className="card" style={{ height: "350px" }}>
        <img
          src={product.imgUrl || "https://via.placeholder.com/150"}
          style={{ height: "50%", objectFit: "cover" }}
          alt={product.name}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <Link to={`/${product.id}`} className="btn btn-primary">
          View Details
        </Link>
        </div>
      </div>
    </div>
  );
}




// export default function Card() {
//   return (
//     <>
//       <div className="container mt-5" style={{ height: "70vh" }}>
//         <div className="row gap-5 ">
//           <div className="col-4">
//             <div className="card" style={{ height: "400px" }}>
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSadhw-KyXYM957RhDKSGUVDVAMeJ9e5k8o1Q&s"
//                 style={{ height: "50%", objectFit: "cover" }}
//                 alt="..."
//               />
//               <div className="card-body">
//                 <h5 className="card-title">Han So Hee</h5>
//                 <p className="card-text">
//                   Some quick example text to build on the card title and make up
//                   the bulk of the card's content.
//                 </p>
//                 <a href="#" className="btn btn-primary">
//                   Likes
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="col-4">
//             <div className="card" style={{ height: "400px" }}>
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSadhw-KyXYM957RhDKSGUVDVAMeJ9e5k8o1Q&s"
//                 style={{ height: "50%", objectFit: "cover" }}
//                 alt="..."
//               />
//               <div className="card-body">
//                 <h5 className="card-title">Han So Hee</h5>
//                 <p className="card-text">
//                   Some quick example text to build on the card title and make up
//                   the bulk of the card's content.
//                 </p>
//                 <a href="#" className="btn btn-primary">
//                   Likes
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="col-4">
//             <div className="card" style={{ height: "400px" }}>
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSadhw-KyXYM957RhDKSGUVDVAMeJ9e5k8o1Q&s"
//                 style={{ height: "50%", objectFit: "cover" }}
//                 alt="..."
//               />
//               <div className="card-body">
//                 <h5 className="card-title">Han So Hee</h5>
//                 <p className="card-text">
//                   Some quick example text to build on the card title and make up
//                   the bulk of the card's content.
//                 </p>
//                 <a href="#" className="btn btn-primary">
//                   Likes
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="col-4">
//             <div className="card" style={{ height: "400px" }}>
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSadhw-KyXYM957RhDKSGUVDVAMeJ9e5k8o1Q&s"
//                 style={{ height: "50%", objectFit: "cover" }}
//                 alt="..."
//               />
//               <div className="card-body">
//                 <h5 className="card-title">Han So Hee</h5>
//                 <p className="card-text">
//                   Some quick example text to build on the card title and make up
//                   the bulk of the card's content.
//                 </p>
//                 <a href="#" className="btn btn-primary">
//                   Likes
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="col-4">
//             <div className="card" style={{ height: "400px" }}>
//               <img
//                 src="https://akcdn.detik.net.id/visual/2024/04/08/kim-ji-won-dalam-drama-korea-queen-of-tears_43.jpeg?w=720&q=90"
//                 style={{ height: "50%", objectFit: "cover" }}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">Kim Ji Won</h5>
//                 <p className="card-text">
//                   Some quick example text to build on the card title and make up
//                   the bulk of the card's content.
//                 </p>
//                 <a href="#" className="btn btn-primary">
//                   Likes
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="col-4">
//             <div className="card" style={{ height: "400px" }}>
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnUWX10tFghK8FM0b3TH2iW45HXsuBr4hX4A&s"
//                 style={{ height: "50%", objectFit: "cover" }}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">Jisoo</h5>
//                 <p className="card-text">
//                   Some quick example text to build on the card title and make up
//                   the bulk of the card's content.
//                 </p>
//                 <a href="#" className="btn btn-primary">
//                   Likes
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
