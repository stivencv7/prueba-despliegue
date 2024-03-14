import axios from "axios";
import { TransactionAssetsInterface } from "../../models/TransactionAssets";


const headers = {
  'Content-Type': 'application/json', 
};


export const transactionAssets = async (transactionAssets:any) => {
    try {
      console.log("service "+transactionAssets?.FROM_EMAIL)
      const response = await axios.post("http://localhost:3061/binance/transferAssets",transactionAssets,{headers:headers});
      
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const assetsList = async () => {
  try {
    const response = await axios.get("http://localhost:3061/binance/assetsList?VIRTUAL_EMAIL=jheisonruapachon7_virtual@3acnd1hunoemail.com");
    return response.data;
  } catch (error) {
    throw error;
  }
};

