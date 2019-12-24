using System;
using System.Data.SqlClient;


namespace Repository
{
    public static class DataReaderExtensions
    {
        private static int GetOrdinalOrThrow(this SqlDataReader reader, string columnName)
        {
            try
            {
                return reader.GetOrdinal(columnName);
            }
            catch (Exception)
            {
                return -1;
            }
        }


        public static string GetString(this SqlDataReader reader, string columnName)
        {
            int colIndex = GetOrdinalOrThrow(reader, columnName);
            if (colIndex == -1) return string.Empty;

            if (!reader.IsDBNull(colIndex))
                return reader.GetString(colIndex);

            return string.Empty;
        }

        public static Guid GetGuid(this SqlDataReader reader, string columnName)
        {
            int colIndex = GetOrdinalOrThrow(reader, columnName);
            if (colIndex == -1) return new Guid("00000000-0000-0000-0000-000000000000");

            if (!reader.IsDBNull(colIndex))
                return reader.GetGuid(colIndex);

            return new Guid("00000000-0000-0000-0000-000000000000");
        }

        public static string GetGuidString(this SqlDataReader reader, string columnName)
        {
            int colIndex = GetOrdinalOrThrow(reader, columnName);
            if (colIndex == -1) return new Guid("00000000-0000-0000-0000-000000000000").ToString();

            if (!reader.IsDBNull(colIndex))
                return reader.GetGuid(colIndex).ToString();

            return new Guid("00000000-0000-0000-0000-000000000000").ToString();
        }


        public static Boolean GetBoolean(this SqlDataReader reader, string columnName)
        {
            int colIndex = GetOrdinalOrThrow(reader, columnName);
            if (colIndex == -1) return false;

            if (!reader.IsDBNull(colIndex))
                return reader.GetBoolean(colIndex);

            return false;
        }

        public static string GetBooleanString(this SqlDataReader reader, string columnName)
        {
            bool value = GetBoolean(reader, columnName);

            if (value)
            {
                return "true";
            }
            else
            {
                return "false";
            }
        }

        public static Decimal GetDecimal(this SqlDataReader reader, string columnName)
        {
            int colIndex = GetOrdinalOrThrow(reader, columnName);
            if (colIndex == -1) return 0;

            if (!reader.IsDBNull(colIndex))
                return reader.GetDecimal(colIndex);

            return 0;
        }

        public static Int32 GetInt32(this SqlDataReader reader, string columnName)
        {
            int colIndex = GetOrdinalOrThrow(reader, columnName);
            if (colIndex == -1) return 0;

            if (!reader.IsDBNull(colIndex))
                return reader.GetInt32(colIndex);

            return 0;
        }

        public static DateTime GetDateTime(this SqlDataReader reader, string columnName)
        {
            int colIndex = GetOrdinalOrThrow(reader, columnName);
            if (colIndex == -1) return new DateTime(1979, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            if (!reader.IsDBNull(colIndex))
                return reader.GetDateTime(colIndex);

            DateTime defaultDate = new DateTime(1979, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            return defaultDate;
        }
    }
}
