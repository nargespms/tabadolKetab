<template>
  <div>
    <v-file-input
      :label="$t('attachments')"
      outlined
      show-size
      hide-details
      @change="upload"
    >
    </v-file-input>
    <p class="mt-2">
      <v-icon color="error" class="pl-2">mdi-exclamation-thick</v-icon>
      <span class="grey--text text--darken-2 ">
        {{ $t('youCanUploadFileWithFormatsjpegpnggifwebpmp4mp3pdftxt') }}.
      </span>
    </p>
  </div>
</template>

<script>
import * as tus from 'tus-js-client';

export default {
  name: 'uploadFile',
  data() {
    return {
      percentage: 0,
      fileInfo: {},
    };
  },

  methods: {
    upload() {
      const file = document.querySelector('input[type=file]').files[0];
      if (file) {
        const { name } = file;
        const extension = name.slice(name.lastIndexOf('.') + 1);
        // Create a new tus upload
        const upload = new tus.Upload(file, {
          endpoint: `${process.env.BASE_URL}v1/api/tabaadol-e-ketaab/upload`,
          retryDelays: [0, 3000, 5000, 10000, 20000],
          chunkSize: 1024 * 1024,
          metadata: {
            filename: file.name,
            filetype: file.type,
            extension,
          },

          onError: error => {
            console.log(`Failed because: ${error}`);
            console.log(upload.url);
          },
          onProgress: (bytesUploaded, bytesTotal) => {
            const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log(bytesUploaded, bytesTotal, `${percentage}%`);
            this.calPercentage(percentage);
          },
          onSuccess: () => {
            this.saveFile(upload, extension, name);
            console.log('onSuccess');
          },
        });

        upload.start();
      } else {
        console.log('noFile');
      }
    },
    saveFile(file, extension, name) {
      console.log(file);
      const { url } = file;
      const id = url.slice(url.lastIndexOf('/') + 1);
      this.$axios
        .post(`/v1/api/tabaadol-e-ketaab/save/${id}`, {
          extension,
          name,
        })
        .then(res => {
          this.$emit('setUploadedId', res.data.id);
          this.fileInfo = {
            id: res.data.id,
            view: res.data.view,
            name: res.data.name,
            extension: res.data.extension,
          };
        });
    },
    calPercentage(value) {
      this.percentage = value;
    },
  },
};
</script>
