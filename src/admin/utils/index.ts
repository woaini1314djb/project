// 格式化时间
export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleString()
}

// 格式化地址
export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// 格式化金额
export const formatAmount = (amount: string | number, decimals = 6) => {
  return Number(amount).toFixed(decimals)
} 