
import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCol } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';
import api from '../../services/axiosConfig';

const CategoriaBarChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    api.get('/subcategorias/contar')
      .then((response) => {
        const categoras = response.data;
        setChartData({
          labels: categoras.map(cat => cat.nome),
          datasets: [
            {
              label: 'Número de Subcategorias',
              backgroundColor: '#f87979',
              data: categoras.map(cat => cat.numeroDeSubcategorias),
            },
          ],
        });
      })
      .catch(error => console.error('Erro ao carregar dados do gráfico:', error));
  }, []);

  return (
    <CCol xs={6}>
      <CCard className="mb-4">
        <CCardHeader>Gráfico de Categorias</CCardHeader>
        <CCardBody>
          <CChartBar
            data={chartData}
            labels="Categorias"
          />
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default CategoriaBarChart;
