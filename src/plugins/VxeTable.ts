import VXETable from "vxe-table";
import 'vxe-table/lib/style.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
import VXETablePluginMenus from 'vxe-table-plugin-menus'
import request from "@/plugins/request";

VXETable.use(VXETablePluginElement)
VXETable.use(VXETablePluginMenus)
const menuConfig = {
    header: {
        options: [
            [
                {code: 'HIDDEN_COLUMN', name: '隐藏'}, {code: 'RESET_COLUMN', name: '显示全部'}, {code: 'FIXED_LEFT_COLUMN', name: '固定到左侧'}, {code: 'FIXED_RIGHT_COLUMN', name: '固定到右侧'}, {code: 'CLEAR_FIXED_COLUMN', name: '取消固定'}, {code: 'RESET_ALL', name: '重置个性化数据', prefixIcon: 'fa fa-undo'}
            ]
        /*    [
                {code: 'PRINT_ALL', name: '打印', prefixIcon: 'fa fa-print'},{code: 'EXPORT_ALL', name: '导出.html', prefixIcon: 'fa fa-download', params: {type: 'html'}}
            ]*/
        ]
    },
    body: {
        options: [
            [
                {code: 'INSERT_AT_ACTIVED_ROW', name: '插入'},
                {code: 'DELETE_ROW', name: '删除'},
                {code: 'CLEAR_CELL', name: '清除内容'}
            ],
            [
                {
                    name: '筛选',
                    prefixIcon: 'fa fa-filter',
                    children: [
                        {code: 'CLEAR_FILTER', name: '清除筛选'},
                        {code: 'CLEAR_ALL_FILTER', name: '重置所有筛选'},
                        {code: 'FILTER_CELL', name: '按所选单元格的值筛选'}
                    ]
                },
                {
                    name: '排序',
                    children: [
                        {code: 'SORT_ASC', name: '升序', prefixIcon: 'fa fa-sort-alpha-desc'},
                        {code: 'SORT_DESC', name: '倒序', prefixIcon: 'fa fa-sort-alpha-desc'},
                        {code: 'CLEAR_SORT', name: '清除排序'}
                    ]
                }
            ],
            [
                {code: 'PRINT_ALL', name: '打印', prefixIcon: 'fa fa-print', params: {columns: [{field: 'name'}, {field: 'age'}, {field: 'rate'}]}},
                {code: 'EXPORT_ALL', name: '导出.csv', prefixIcon: 'fa fa-download', params: {columns: [{field: 'name'}, {field: 'age'}, {field: 'rate'}], type: 'csv'}}
            ]
        ]
    },
    footer: {
        options: [
            [
                {code: 'EXPORT_ALL', name: '导出.xml', prefixIcon: 'fa fa-download', params: {columns: [{field: 'name'}, {field: 'role'}, {field: 'sex'}], type: 'xml'}},
                {code: 'PRINT_ALL', name: '打印', prefixIcon: 'fa fa-print', params: {columns: [{field: 'name'}, {field: 'role'}, {field: 'sex'}]}}
            ]
        ]
    }
}
VXETable.setup({
    table: {
        border: true,
        align: 'center',
        autoResize: true,
        resizable: true,
        columnConfig: {isCurrent: true, isHover: true},
        menuConfig: menuConfig,
        treeConfig:{
            lazy: true,
            transform: true,
            parentField: 'parent_id',
            hasChildField: 'has_children',
            childrenField: 'children',
            accordion: true
        },
        rowConfig: {
            isCurrent: true, isHover: true
        },


    }
})


VXETable.formats.add('status', {
    cellFormatMethod({cellValue}, ...param) {
        return param[cellValue]
    }
})
export default VXETable;