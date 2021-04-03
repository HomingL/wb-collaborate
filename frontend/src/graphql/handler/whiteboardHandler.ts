import { useGetWhiteboardsQuery } from "../../generated/apolloComponents"

const GetWhiteboardsHandler = () => {
    const { data, error, loading } = useGetWhiteboardsQuery();
      
      if (loading) return [];
      if (error) return [];
      return data;
  }
  
  export { GetWhiteboardsHandler };