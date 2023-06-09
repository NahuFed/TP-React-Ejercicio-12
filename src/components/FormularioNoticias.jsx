import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import GrillaNoticias from "./GrillaNoticias";

const FormularioNoticias = () => {
  const [arrayNoticias, setArrayNoticias] = useState([]);
  const [selectPais, setSelectPais] = useState("");
  const [selectCategoria, setSelectCategoria] = useState("");

  

  useEffect(() => {
    consultarAPI();
  }, [selectPais,selectCategoria]);

  const handleSelect = (e) => {
    setBusqueda(e.target.value);
  };
  const cambiarPais = (e) =>{
    setSelectPais(e.target.value)
  }
  const cambiarCategoria = (e) =>{
    setSelectCategoria(e.target.value)
  }
  
let pais ='';
if(!selectPais){
  pais = 'ar';
}else {
  pais = selectPais;
}
let categoria ='';
if(!selectCategoria){
  categoria = 'top';
}else {
  categoria = selectCategoria;
}

  const consultarAPI = async () => {
    //peticion GET
    try {
      const respuesta = await fetch(
        `https://newsdata.io/api/1/news?country=${pais}&apikey=pub_24185fcb0d47542298171f751b8c6946a2ab8&category=${categoria} `
      ); //direccion de la api
      const datos = await respuesta.json();     
      setArrayNoticias(datos.results);
      console.log(arrayNoticias)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border">
      <Form className="border-bottom p-3">
        <Row>
          <Col xs="4">
            <Form.Label>Categoria</Form.Label>
          </Col>
          <Col>
            <Form.Select
              aria-label="Default select example"
              value={selectCategoria}
              onChange={cambiarCategoria}
            >
              <option value="">Selecciona la Categoria</option>
              <option value="business">Negocios</option>
              <option value="entertainment">Entretenimiento</option>
              <option value="environment">Medio Ambiente</option>
              <option value="food">Comida</option>
              <option value="health">Salud</option>
              <option value="politics">Politica</option>
              <option value="science">Ciencia</option>
              <option value="sports">Deportes</option>
              <option value="technology">Tecnologia</option>
              <option value="top">Top</option>
              <option value="tourism">Turismo</option>
              <option value="world">Mundo</option>
            </Form.Select>
            <Form.Select
              aria-label="Default select example"
              value={selectPais}
              onChange={cambiarPais}
            >
              <option value="">Seleccione el pais</option>
              <option value="ar">Argentina</option>
              <option value="br">Brasil</option>
              <option value="cn">China</option>
              <option value="us">EEUU</option>
              <option value="es">España</option>
              <option value="fr">Francia</option>
              <option value="it">Italia</option>
              <option value="jp">Japon</option>
              <option value="ru">Rusia</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      <GrillaNoticias arrayNoticias={arrayNoticias}></GrillaNoticias>
    </div>
  );
};
export default FormularioNoticias;
