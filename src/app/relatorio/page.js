'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Chart, registerables } from 'chart.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Pagina from '@/components/Pagina';
import 'bootstrap/dist/css/bootstrap.min.css';

Chart.register(...registerables);

const Relatorio = () => {
  const [dados, setDados] = useState({
    alunos: [],
    avaliacoes: [],
    pagamentos: [],
  });

  const graficoRefs = useRef([null, null, null]);

  const obterDadosLocalStorage = useCallback((key) => {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (error) {
      console.error(`Erro ao acessar o localStorage: ${error}`);
      return [];
    }
  }, []);

  useEffect(() => {
    setDados({
      alunos: obterDadosLocalStorage('alunos'),
      avaliacoes: obterDadosLocalStorage('avaliacoes'),
      pagamentos: obterDadosLocalStorage('pagamentos'),
    });
  }, [obterDadosLocalStorage]);

  useEffect(() => {
    if (dados.alunos.length && dados.avaliacoes.length && dados.pagamentos.length) {
      configurarGraficos();
    }
    return () => {
      graficoRefs.current.forEach(grafico => grafico?.destroy());
    };
  }, [dados]);

  const configurarGraficos = useCallback(() => {
    const configuracoes = [
      {
        label: 'Alunos',
        data: [dados.alunos.length],
        color: '#4caf50',
        refIndex: 0,
        title: 'Total de Alunos',
        axisLabels: ['Alunos'],
      },
      {
        label: 'Avaliações',
        data: [dados.avaliacoes.length],
        color: '#2196f3',
        refIndex: 1,
        title: 'Total de Avaliações',
        axisLabels: ['Avaliações'],
      },
      {
        label: 'Pagamentos',
        data: [dados.pagamentos.length],
        color: '#ff9800',
        refIndex: 2,
        title: 'Total de Pagamentos',
        axisLabels: ['Pagamentos'],
      },
    ];

    configuracoes.forEach(({ label, data, color, refIndex, title, axisLabels }) => {
      const ctx = document.getElementById(`grafico${label}`).getContext('2d');
      if (graficoRefs.current[refIndex]) graficoRefs.current[refIndex].destroy();

      graficoRefs.current[refIndex] = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: axisLabels,
          datasets: [
            {
              label: `Quantidade de ${label}`,
              data,
              backgroundColor: color,
              borderColor: color,
              borderWidth: 1,
              hoverBackgroundColor: `${color}aa`,
              hoverBorderColor: `${color}cc`,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: title,
              font: {
                size: 16,
                weight: 'bold',
              },
            },
            tooltip: {
              callbacks: {
                label: context => `${context.dataset.label}: ${context.raw}`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
              title: {
                display: true,
                text: 'Quantidade',
              },
            },
            x: {
              title: {
                display: true,
                text: title,
              },
            },
          },
        },
      });
    });
  }, [dados]);

  const exportarPDF = useCallback(() => {
    const doc = new jsPDF();
    doc.text('Relatório de Alunos, Avaliações e Pagamentos', 14, 20);

    // Formatar os dados dos alunos para exibir no PDF
    const alunosFormatados = dados.alunos.map(aluno => [
      aluno.nome || 'Nome não disponível', 
      aluno.idade || 'Idade não disponível'
    ]);
    doc.autoTable({
      head: [['Nome do Aluno', 'Idade']],
      body: alunosFormatados,
      startY: 30,
    });

    const graficos = ['Alunos', 'Avaliações', 'Pagamentos'];
    let posicaoY = doc.autoTable.previous.finalY + 10;

    graficos.forEach((grafico, index) => {
      const canvas = document.getElementById(`grafico${grafico}`);
      if (canvas) {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', index % 2 === 0 ? 15 : 105, posicaoY, 90, 60);
        if (index % 2 === 1) posicaoY += 70;
      }
    });

    doc.save('relatorio_alunos_avaliacoes_pagamentos.pdf');
  }, [dados]);

  return (
    <Pagina className="container mt-5">
      <h1 className="text-center mb-4">Relatório de Alunos, Avaliações e Pagamentos</h1>
      <div className="row justify-content-center mb-4">
        {['Alunos', 'Avaliações', 'Pagamentos'].map((item) => (
          <div key={item} className="col-md-4 mb-3">
            <div className="card shadow">
              <div className="card-body">
                <canvas id={`grafico${item}`} style={{ maxWidth: '100%', height: 'auto' }}></canvas>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          className="btn btn-success btn-lg"
          onClick={exportarPDF}
        >
          Exportar PDF
        </button>
      </div>
    </Pagina>
  );
};

export default Relatorio;
