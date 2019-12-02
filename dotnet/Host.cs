using System.Security.Cryptography;
using Wasmtime;

namespace WasmtimeDemo
{
    class Host : IHost
    {
        // These are from the current WASI proposal.
        const int WASI_ENOTSUP = 58;
        const int WASI_SUCCESS = 0;

        public Instance Instance { get; set; }

        [Import("fd_write", Module = "wasi_unstable")]
        public int WriteFile(int fd, int iovs, int iovs_len, int nwritten)
        {
            return WASI_ENOTSUP;
        }

        [Import("random_get", Module = "wasi_unstable")]
        public int GetRandomBytes(int buf, int buf_len)
        {
            _random.GetBytes(Instance.Externs.Memories[0].Span.Slice(buf, buf_len));
            return WASI_SUCCESS;
        }

        private RNGCryptoServiceProvider _random = new RNGCryptoServiceProvider();
    }
}