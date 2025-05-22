import { useState, useEffect } from "react";

import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Device = () => {
  const ITEMS_PER_PAGE = 5;

  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const navigate = useNavigate(); // Optional, if you still use navigation

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/admin/device-balance?page=${page}&items=${ITEMS_PER_PAGE}`);

        if (response.data && response.data.isSuccess) {
          setData(response.data.data);
          setTotalCount(response.data.totalCount);
          setErrMsg('');
        } else {
          setErrMsg('Failed to load data.');
        }
      } catch (error) {
        console.error(error);
        setErrMsg('Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-green-400 mb-4">Device Balance</h2>

        {errMsg && <p className="text-red-400 mb-4">{errMsg}</p>}
        {isLoading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700 text-white rounded-lg">
                <thead>
                  <tr className="bg-gray-600 text-green-300">
                    <th className="py-2 px-4 text-left">ID</th>
                    <th className="py-2 px-4 text-left">Device ID</th>
                    <th className="py-2 px-4 text-left">Amount (RON)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((device, index) => (
                    <tr key={device.id} className="border-b border-gray-600 hover:bg-gray-600">
                      <td className="py-2 px-4">{index+1}</td>
                      <td className="py-2 px-4">{device.device_id || '—'}</td>
                      <td className="py-2 px-4">{device.amount.toFixed(2) || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-green-200">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

};

export default Device;