<template>
    <div>
      <h2 class="page-title">Quản lý cơ sở</h2>
      <b-card>
        <h4 class="section-title">Tìm kiếm</h4>

        <b-form class="mb-3 search-form">
            <div class="d-flex flex-column flex-sm-row align-items-sm-center">
                <b-input-group class="mb-2 mb-sm-0 mr-sm-2 w-100 w-sm-100">
                    <b-form-input v-model="searchKeyword" placeholder="Nhập từ khóa"></b-form-input>
                </b-input-group>

                <b-input-group class="mb-2 mb-sm-0 mr-sm-2 w-100 w-sm-100">
                    <b-form-select v-model="searchStatus" :options="statusOptions"></b-form-select>
                </b-input-group>

                <b-button @click="filterDepartments" variant="primary" class="w-100 w-sm-100">
                    Tìm kiếm
                </b-button>
            </div>
        </b-form>

        <h4 class="section-title">Danh sách cơ sở</h4>
        <b-table :items="paginatedDepartments" :fields="fields" striped responsive="md" class="custom-table">
          <template #cell(status)="row">
            <b-form-checkbox switch v-model="row.item.status" @change="confirmStatusChange(row.item)"></b-form-checkbox>
          </template>
        </b-table>

        <div class="d-flex justify-content-between align-items-center flex-wrap pagination-container">
            <div class="d-flex align-items-center gap-2">
                <span class="font-weight-bold">Tổng số bản ghi: {{ filteredDepartments.length }}</span>
            </div>
            <b-pagination
                v-model="currentPage"
                :total-rows="filteredDepartments.length"
                :per-page="perPage"
                aria-controls="departmentsTable"
                size="sm"
                pills
            ></b-pagination>
        </div>

        <b-modal v-model="showConfirm" title="Xác nhận" @ok="updateStatus">
          Bạn có chắc chắn muốn thay đổi trạng thái của cơ sở này không?
        </b-modal>
      </b-card>
    </div>
  </template>

  <script>
  export default {
    name: "CampusManagement",
    data() {
      return {
        searchKeyword: '',
        searchStatus: '',
        currentPage: 1,
        perPage: 5,
        showConfirm: false,
        selectedDepartment: null,
        departments: [
          { id: 1, stt: 1, department: 'BTEC HN', status: true, updated_at: '12/17/2024 15:16', updated_by: 'TrangNT317' },
          { id: 2, stt: 2, department: 'BTEC HCM', status: false, updated_at: '12/18/2024 15:16', updated_by: 'TrangNT317' },
          { id: 3, stt: 3, department: 'BTEC ĐN', status: true, updated_at: '12/19/2024 15:16', updated_by: 'TrangNT317' },
          { id: 4, stt: 4, department: 'BTEC CT', status: true, updated_at: '12/20/2024 15:16', updated_by: 'TrangNT317' },
          { id: 5, stt: 5, department: 'MEL HN', status: false, updated_at: '12/21/2024 15:16', updated_by: 'TrangNT317' },
          { id: 6, stt: 6, department: 'MEL HCM', status: true, updated_at: '12/21/2024 15:16', updated_by: 'TrangNT317' }
        ],
        statusOptions: [
          { value: '', text: 'Chọn trạng thái' },
          { value: true, text: 'Hoạt động' },
          { value: false, text: 'Không hoạt động' }
        ],
        fields: [
          { key: 'stt', label: 'STT' },
          { key: 'department', label: 'Cơ sở' },
          { key: 'status', label: 'Trạng thái' },
          { key: 'updated_at', label: 'Cập nhật lúc' },
          { key: 'updated_by', label: 'Cập nhật bởi' }
        ]
      };
    },
    computed: {
      filteredDepartments() {
        return this.departments.filter(department => {
          const matchesKeyword = this.searchKeyword ? department.department.toLowerCase().includes(this.searchKeyword.toLowerCase()) : true;
          const matchesStatus = this.searchStatus !== '' ? department.status === this.searchStatus : true;
          return matchesKeyword && matchesStatus;
        });
      },
      paginatedDepartments() {
        const start = (this.currentPage - 1) * this.perPage;
        return this.filteredDepartments.slice(start, start + this.perPage);
      }
    },
    methods: {
      filterDepartments() {
        this.currentPage = 1; // Reset pagination when filtering
      },
      confirmStatusChange(department) {
        this.selectedDepartment = department;
        this.showConfirm = true;
      },
      updateStatus() {
        if (this.selectedDepartment) {
          this.selectedDepartment.status = !this.selectedDepartment.status;
        }
      }
    }
  };
  </script>

<style scoped>
.page-title {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 576px) {
  .search-form {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
