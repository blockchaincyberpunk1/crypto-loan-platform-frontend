import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import LoanContract from "../contracts/LoanContract.json"; // Assuming ABI is here

const contractAddress = "0xdeD1a7d1Cbe66523cd5dD7e27DE5A177fa182de5"; // Deployed contract address
console.log(LoanContract.abi);

/**
 * Initialize ethers with MetaMask provider
 */
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const loanContract = new ethers.Contract(
  contractAddress,
  LoanContract.abi,
  signer
);

/**
 * Async thunk for creating a new loan
 */
export const createLoan = createAsyncThunk(
  "loans/createLoan",
  async ({ amount }, { rejectWithValue }) => {
    try {
      // Fetch the collateral requirement from the smart contract
      const collateralRequirement = await loanContract.collateralRequirement();
      const collateralAmount = ethers.utils.parseEther(
        ((amount * collateralRequirement) / 100).toString()
      );

      const transaction = await loanContract.createLoan(
        ethers.utils.parseEther(amount.toString()),
        { value: collateralAmount }
      );
      await transaction.wait();
      return transaction.hash;
    } catch (error) {
      console.error("Error creating loan:", error);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk for repaying a loan
 */
export const repayLoan = createAsyncThunk(
  "loans/repayLoan",
  async ({ loanId, amount }, { rejectWithValue }) => {
    try {
      const transaction = await loanContract.repayLoan(loanId, {
        value: ethers.utils.parseEther(amount.toString()),
      });
      await transaction.wait();
      return transaction.hash;
    } catch (error) {
      console.error("Error repaying loan:", error);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to fetch all loans
 */
export const fetchAllLoans = createAsyncThunk(
  "loans/fetchAllLoans",
  async (_, { rejectWithValue }) => {
    try {
      const loans = await loanContract.fetchAllLoans();
      if (!loans) throw new Error("Failed to fetch loans from the contract.");
      return loans.map((loan) => {
        console.log("Raw dueDate from contract:", loan.dueDate);
        console.log("Converted dueDate to number:", loan.dueDate.toNumber());
        return {
          id: loan.id.toNumber(),
          borrower: loan.borrower,
          amount: ethers.utils.formatEther(loan.amount),
          collateralAmount: ethers.utils.formatEther(loan.collateralAmount),
          dueDate: new Date(loan.dueDate.toNumber() * 1000).toISOString(),
          isRepaid: loan.isRepaid,
        };
      });
    } catch (error) {
      console.error("Error fetching loans:", error);
      return rejectWithValue(
        "Failed to fetch loans. Ensure the contract is deployed and network is correct."
      );
    }
  }
);

const loanSlice = createSlice({
  name: "loans",
  initialState: {
    loans: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLoan.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLoan.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createLoan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(repayLoan.fulfilled, (state, action) => {
        // Assuming loan status change or state update logic here
      })
      .addCase(fetchAllLoans.fulfilled, (state, action) => {
        state.loans = action.payload;
        state.status = "succeeded";
      });
  },
});

export default loanSlice.reducer;
