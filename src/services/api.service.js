const APIService = () => {
  const getStatus = (req, res) => {
    return res.status(200).json({ message: 'API is fully functional!' });
  };

  return { getStatus };
};

export default APIService;
